import middy from "@middy/core";
import chromium from "chrome-aws-lambda";

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

const pdf = async (url, cookies) => {
  try {
    const executablePath = process.env.IS_OFFLINE ? null : await chromium.executablePath;

    const browser = await chromium.puppeteer.launch({
        headless: true,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        ignoreHTTPSErrors: true,
      });
    
      const host = (new URL(url)).hostname;
      const page = await browser.newPage();
      const rememberMe = cookies['pmcv-rememberme'];
    
      //`${process.env.BASE_URL}/candidate/${id}/cv?pmcvtoken=${otp}`
    
      const newUrl = `${url}?pmcvtoken=${rememberMe}`;
    
      await page.goto(newUrl, { 
        // waitUntil: 'networkidle0',
        // waitUntil: "load",
        timeout: 10000
      });

      // await page.waitFor('*');

      await page.waitForSelector('.formio-form .form-group', {
        visible: true,
      });
    
      page
        .on("console", message =>
          console.log(
            `PUPPETEER_LOG: ${message
              .type()
              .substr(0, 3)
              .toUpperCase()} ${message.text()}`
          )
        )
        .on("pageerror", ({ message }) => console.log(message))
        .on("response", response => console.log(`${response.status()} ${response.url()}`))
        .on("requestfailed", request => console.log(`${request.failure().errorText} ${request.url()}`));
    
      const cookieArr = Object.keys(cookies).map((key) => {
        const value = cookies[key];
    
        return {
          name: key,
          value,
          domain: host,
        };
      });
    
      await page.setCookie(...cookieArr);
    
      await wait(400);
    
      // if (host === 'staging.allocations.pmcv.com.au') {
      //   await page.setExtraHTTPHeaders({
      //     authorization: `Basic ${Buffer.from('staging:pmcvstaging').toString('base64')}`,
      //   });
      // }
    
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
        footerTemplate: '<div style="font-size: 10px; font-family: arial; text-align: right; margin-right: 20px; width: 100%">Page <span class="pageNumber"></span></div>',
      });

      await browser.close();
    
      return stream;
    } catch (error) {
      console.log(error)
    }
}

export default pdf;