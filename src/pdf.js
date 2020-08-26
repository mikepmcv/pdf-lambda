import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import pdf from './lib/pdf';

const handler = async (event, context) => {
  try {
    const { url, footerText } = event.queryStringParameters;

    const stream = await pdf({ url, footerText });

    const response = {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
      },
      body: stream.toString('base64'),
    };

    // context.callbackWaitsForEmptyEventLoop = false;

    return context.succeed(response);
  } catch (error) {
    console.log(error);

    return context.fail(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
