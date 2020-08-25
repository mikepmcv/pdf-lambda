import middy from "@middy/core";
import chromium from "chrome-aws-lambda";
import styles from './styles'

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

const pdf = async (url, name) => {
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
    
      await page.goto(url, { 
        timeout: 15000
      });

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
    
      // const cookieArr = Object.keys(cookies).map((key) => {
      //   const value = cookies[key];
    
      //   return {
      //     name: key,
      //     value,
      //     domain: host,
      //   };
      // });
    
      // await page.setCookie(...cookieArr);
    
      await wait(400);
    
      // if (host === 'staging.allocations.pmcv.com.au') {
      //   await page.setExtraHTTPHeaders({
      //     authorization: `Basic ${Buffer.from('staging:pmcvstaging').toString('base64')}`,
      //   });
      // }

      await page.$eval("body", element => element.classList.add("pdf-view"));
    
      await page.addStyleTag({
        content: styles,
      });

      await page.emulateMediaType("screen");
    
      const pdf = await page.pdf({
        format: "A4",
        margin: {
          top: "50px",
          left: "50px",
          bottom: "50px",
          right: "50px"
        },
        displayHeaderFooter: true,
        headerTemplate: "<div/>",
        footerTemplate: `<div style="font-size: 10px; font-family: arial; text-align: right; margin-right: 20px; width: 100%"><span style="margin-right:40px;">${name || ''}</span>Page <span class="pageNumber"></span>/<span class="totalPages"></span></div>`
      });

      await browser.close();
    
      return pdf;
    } catch (error) {
      console.log(error);
      
      throw new Error('failed');
    }
}

export default pdf;