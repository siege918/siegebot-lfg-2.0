import * as cdk from '@aws-cdk/core';

import { BotDbStack } from './db';

const app = new cdk.App();

new BotDbStack(app, 'Siegebot', {
  env: {
    region: 'us-west-2',
  },
});

app.synth();
