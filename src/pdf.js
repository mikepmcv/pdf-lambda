import pdf from './lib/pdf';

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event, context) => {
  try {
    const { url, footerText, jwt } = event.queryStringParameters;

    const stream = await pdf({ url, footerText, jwt });

    const response = {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
      },
      body: stream.toString('base64'),
    };

    context.callbackWaitsForEmptyEventLoop = false;

    return context.succeed(response);
  } catch (error) {
    console.log(error);

    return context.fail(error);
  }
};
