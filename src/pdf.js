import pdf from './lib/pdf';

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const {
      url,
      footerText,
      jwt,
      waitForFormio,
    } = event.queryStringParameters;

    const stream = await pdf({
      url, footerText, jwt, waitForFormio,
    });

    const response = {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
      },
      body: stream.toString('base64'),
    };

    return context.succeed(response);
  } catch (error) {
    console.log('LAMBDA CATCH:', error);

    return context.fail(error);
  }
};

export default handler;
