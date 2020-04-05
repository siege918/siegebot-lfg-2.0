### Siegebot-LFG Stack Generator

Currently this package uses AWS CDK to generate the following:

- A CloudFormation stack named Siegebot
  - A DynamoDB table named Siegebot-Lfg(UniqueIdentifier)
  - Some outputs that we can use in the application to get the generated table name:
    - LfgTableName
    - LfgTableArn (might need it at some point?)

### Future Work

The stack name, table name, and region should probably be extracted to environment variables or something, but this is MVP.

A conversation worth having is if this package should be extracted to its own top-level package or if it should live within this package. Also, if this stack package should have its own dependencies or just use one `package.json`/`node_modules` for everything.

### Useage!

The following steps assume that you have already setup the AWS CLI on your machine.

1. Build the Typescript

```
npm run build
```

1. Synthesize the CDK stack

```
npm run synth
```

1. Deploy to AWS account

```
npm run deploy
```

#### Note

If iterating because you're making changes, you can run `npm run diff` after a build/synth to compare what you have locally to what is already built in AWS.

There are also some other useful commands in the `package.json`.
