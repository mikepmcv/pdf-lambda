import middy from "@middy/core";
import chromium from "chrome-aws-lambda";
import { APIGatewayEvent } from "aws-lambda";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import pdf from "./lib/pdf";

const handler = async (event, context) => {
  try {
    const { url, name } = event.queryStringParameters;

    const stream = await pdf(url, name);

    const response = {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
      },
      body: stream.toString('base64'),
    };

    return context.succeed(response);
  } catch (error) {
    return context.fail(error);
  }
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
