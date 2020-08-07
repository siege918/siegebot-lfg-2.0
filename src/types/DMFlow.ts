import { Snowflake } from 'discord.js';

import DMFlowStep from './DMFlowStep';
import { IGroup } from './Group';

interface IDMFlow {
  step: DMFlowStep;
  channelId: Snowflake;
  ownerUserId: Snowflake;
}

type DMFlow = IDMFlow & Partial<IGroup>;

export default DMFlow;
