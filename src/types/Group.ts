import { Snowflake } from 'discord.js';

export default interface Group {
  channelId: Snowflake;
  groupId?: string;
  groupName: string;
  ownerUserId: Snowflake;
  playerLimit?: number;
  startTime: Date;
}
