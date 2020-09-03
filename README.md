
# PDF-lambda

This is a lambda function that creates a PDF from a URL.

To get it running locally:
```
yarn
yarn start
```
Lambda will run on http://localhost:3003/dev/pdf

## Running in PMCV
Start lambda locally and in the PMCV codebase add an environment variable named PUPPETEER_URL to your .env file with value of http://localhost:3003/dev/pdf.
```
PUPPETEER_URL=http://localhost:3003/dev/pdf
```

## Testing

You can run the example code by opening up a new terminal tab and running:
```
yarn example
```
This will start up a http server and that will run on on http://localhost:8008 running ./example/index.html. This allows you test the pdf functionality seperately without PMCV.

To test pages that require a jwt token simply get the token from the pmcv-rememberme cookie and pass it in as a GET param to the lambda.

## Deployment

Deployment should be handled by Circleci on git push. If you need to deploy manually for some reason you need to setup the serverless framework locally.

Run:
```
yarn serverless
```

That will guide you and what you need to do.

The most important thing is having AWS credentials setup and having the correct account permissions. You can get a key and secret from the IAM section in AWS.

```
serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```
This is a once off setup that you never worry about again.

Once everything is setup you simply run:
```
yarn deploy_prod
```
or for staging:
```
yarn deploy_dev
```

## Logs

You can view the lambda logs on prod with:
```
yarn logs_prod
```
or for staging:
```
yarn logs_dev
```
