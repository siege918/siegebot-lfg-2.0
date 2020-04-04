import { Message, TextChannel } from 'discord.js';

import { Config } from '@lfg/types';
import { addPlayerToGroup, getGroup } from '@lfg/services/GroupService';

export default (message: Message, config: Config) => {
  // Only allow this command in a server, not in a DM
  if (message.channel.type !== 'text') return;

  const textChannel = message.channel as TextChannel;

  const splitMessage = message.content.split(/\s+/);
  const groupId = splitMessage[1];

  const group = getGroup(groupId);

  if (!group || group.channelId !== message.channel.id) {
    message.author.send(
      `Couldn't find group for ID ${groupId}. Did you type it in correctly?`
    );
    return;
  }

  if (group.players.includes(message.author.id)) {
    message.author.send(`You're already in the group \`${group.groupName}\`.`);
    return;
  }

  addPlayerToGroup(message.author.id, groupId);

  message.author.send(
    `Let's get started on making an LFG group for the channel \`${textChannel.name}\` in server \`${textChannel.guild.name}\`
      
    First, what do you want your group to be named? This should be the name of the activity/game you're planning.`
  );
};
