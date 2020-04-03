import { Snowflake } from 'discord.js';

import DMFlowStep from './DMFlowStep';
import Group from './Group';

interface IDMFlow {
  step: DMFlowStep;
  channelId: Snowflake;
  ownerUserId: Snowflake;
}

type DMFlow = IDMFlow & Partial<Group>;

export default DMFlow;
