import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import styles from './styles';

/**
  @param {{
    url: string,
    footerText?: string,
    cookies?: Array,
    jwt?: string
 }} options
*/

const pdf = async ({
  url,
  footerText,
  cookies = [],
  jwt = '',
}) => {
  
  const executablePath = process.env.IS_OFFLINE ? null : await chromium.executablePath;

  console.time('PAGETIME');

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  try {
    // create isolated browser that doesnt share cookies etc
    // const context = await browser.createIncognitoBrowserContext();

    console.log('BROWSER LOADED');
    console.timeLog('PAGETIME');

    const host = new URL(url).hostname;
    const page = await browser.newPage();

    if (jwt) {
      await page.setCookie({
        name: 'pmcv-rememberme',
        value: jwt,
        domain: host,
      });
    }

    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
    );

    page
      .on('error', () => console.log('ERROR'))
      .on('disconnected', () => console.log('DISCONNECTED'))
      .on('pageerror', ({ message }) => console.log(message))
      .on('requestfailed', async (request) => {
        console.log(`${request.failure().errorText} ${request.url()}`);
      });

    await page
    .goto(url, {
      waitUntil: 'networkidle2',
    })
      .catch(async (e) => {
        console.log('PAGE ERROR CATCH', e.message);

        await browser.close();
        console.time('PAGETIME');

        throw new Error('failed');
      });

    await page.emulateMediaType('screen');

     await page.waitForSelector('.formio-form .form-group', {
        visible: true,
     });

    console.log('PAGE LOADED');
    console.timeLog('PAGETIME');

    if (cookies && cookies.length) {
      const cookieArr = Object.keys(cookies).map((key) => {
        const value = cookies[key];

        return {
          name: key,
          value,
          domain: host,
        };
      });

      await page.setCookie(...cookieArr);
    }

    await page.$eval('body', (element) => element.classList.add('pdf-view'));
    await page.addStyleTag({
      content: styles,
    });

    console.log('START PDF');

    const stream = await page.pdf({
      format: 'A4',
      margin: {
        top: '50px',
        left: '50px',
        bottom: '50px',
        right: '50px',
      },
      displayHeaderFooter: true,
      headerTemplate: '<div/>',
      footerTemplate: `<div style="font-size: 10px; font-family: arial; text-align: right; margin-right: 20px; width: 100%"><span style="margin-right:40px;">${
        footerText || ''
      }</span>Page <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
    });

    console.log('END PDF');
    console.timeEnd('PAGETIME');

    await browser.close();

    return stream;
  } catch (error) {
    console.log('CRASHED', error);
    console.timeEnd('PAGETIME');

    await browser.close();

    throw new Error('failed');
  }
};

export default pdf;
