import { Client, Message, TextChannel } from 'discord.js';

import { Config } from '@lfg/types';
import { startFlow } from '@lfg/services/DMFlowService';

export default (message: Message, config: Config) => {
  // TODO: initialize DM flow, send DM to sender telling them first step

  // Only allow this command in a server, not in a DM
  if (message.channel.type !== 'text') return;

  const textChannel = message.channel as TextChannel;

  startFlow(message.author.id, message.channel.id);

  message.author.send(
    `Let's get started on making an LFG group for the channel \`${textChannel.name}\` in server \`${textChannel.guild.name}\`
      
      First, what do you want your group to be named? This should be the name of the activity/game you're planning.`
  );
};
