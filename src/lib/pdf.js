import chromium from 'chrome-aws-lambda';
import styles from './styles';

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const pdf = async ({ url, footerText, cookies = [] }) => {
  try {
    const executablePath = process.env.IS_OFFLINE ? null : await chromium.executablePath;

    const browser = await chromium.puppeteer.launch({
      headless: true,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      ignoreHTTPSErrors: true,
    });

    // create isolated browser that doesnt share cookies etc
    // const context = await browser.createIncognitoBrowserContext();

    const host = new URL(url).hostname;
    const page = await browser.newPage();

    await page.setCacheEnabled(false);

    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
    );

    page
      .on('console', (message) => console.log(
        `PUPPETEER_LOG: ${message
          .type()
          .substr(0, 3)
          .toUpperCase()} ${message.text()}`,
      ))
      // .on("request", ({ message }) => console.log('REQUEST STARTED'))
      .on('error', () => console.log('ERROR'))
      .on('disconnected', () => console.log('DISCONNECTED'))
      // .on("requestfinished", () => console.log('REQ FINISHED'))
      .on('pageerror', ({ message }) => console.log(message))
      // .on("response", response => console.log(`${response.status()} ${response.url()}`))
      .on('requestfailed', async (request) => {
        console.log(`${request.failure().errorText} ${request.url()}`);

        // await page.reload();
      });

    await page
      .goto(url, {
        timeout: 15000,
      })
      .catch((e) => {
        console.log(e.message);
      });

    await page.waitForSelector('.formio-form .form-group', {
      visible: true,
    });

    console.log('PAGE LOADED');

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

    await wait(400);

    // if (host === 'staging.allocations.pmcv.com.au') {
    //   await page.setExtraHTTPHeaders({
    //     authorization: `Basic ${Buffer.from('staging:pmcvstaging').toString('base64')}`,
    //   });
    // }

    await page.$eval('body', (element) => element.classList.add('pdf-view'));

    await page.addStyleTag({
      content: styles,
    });

    await page.emulateMediaType('screen');

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

    await browser.close();

    return stream;
  } catch (error) {
    console.log(error);

    throw new Error('failed');
  }
};

export default pdf;
