import middy from "@middy/core";
import chromium from "chrome-aws-lambda";
import { APIGatewayEvent } from "aws-lambda";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import pdf from "../lib/pdf";

const handler = async (event, context) => {
  try {
    const { url } = event.queryStringParameters;
    // const cookies = event.headers.Cookie.split('; ').reduce((prev, current) => {
    //   const [name, value] = current.split('=');
    //   prev[name] = value;
    //   return prev
    // }, {});

    const cookies = {
      "pmcv-rememberme":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWRtaW5AdXNlcmNlbnRyaWMuY29tLmF1Iiwicm9sZSI6ImFkbWluIiwiZmlyc3ROYW1lIjoiVXNlckNlbnRyaWMiLCJsYXN0TmFtZSI6IkZ1bmN0aW9uYWwgQWNjb3VudCIsInByb2Zlc3Npb24iOm51bGwsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNTk4Mjc3OTMzfQ.tuHVX3BUgQoukyJIICoUy3f2LlZkJlAITpYNC5NFo9U",
    };

    const stream = await pdf(url, cookies);

    const response = {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Headers': 'Set-Cookie',
      },
      body: stream.toString('base64'),
    };

    return context.succeed(response);
  } catch (error) {
    return context.fail(error);
  }
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
