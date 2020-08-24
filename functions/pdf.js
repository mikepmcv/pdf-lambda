import middy from "@middy/core";
import chromium from "chrome-aws-lambda";
import { APIGatewayEvent } from "aws-lambda";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";

const handler = async (event) => {
  const { url } = event.queryStringParameters;
  const cookies = event.headers.Cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev
  }, {});

  console.log(url, cookies)

  const executablePath = process.env.IS_OFFLINE
    ? null
    : await chromium.executablePath;
    
  const browser = await chromium.puppeteer.launch({
    headless: true,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });

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

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-type": "application/pdf",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: stream.toString("base64")
  };
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
