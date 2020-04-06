import { Message, TextChannel } from 'discord.js';

import { getGroup, removePlayerFromGroup } from '@lfg/services/GroupService';
import { Config } from '@lfg/types';

export default (message: Message, config: Config) => {
  const splitMessage = message.content.split(/\s+/);
  const groupId = splitMessage[1];

  const group = getGroup(groupId);

  // No group with given ID
  if (!group) {
    message.author.send(
      `Couldn't find group for ID ${groupId}. Did you type it in correctly?`
    );
    return;
  }

  const groupChannel = message.client.channels.get(
    group.channelId
  ) as TextChannel;

  // If this user isn't in the channel the group is attached to, they shouldn't be able to know it exists
  if (
    !groupChannel ||
    !groupChannel.members.some(member => member.id === message.author.id)
  ) {
    message.author.send(
      `Couldn't find group for ID ${groupId}. Did you type it in correctly?`
    );
    return;
  }

  // User should only use this command either in the channel where the room is created or in a DM
  if (message.channel.type !== 'dm' && message.channel.id !== group.channelId) {
    message.author.send(
      'You should only use the leave command in either a DM or the channel where the group was created.'
    );
  }

  // User can't leave a group they're not in
  if (!group.players.includes(message.author.id)) {
    message.author.send(`You're not in the group \`${group.groupName}\`.`);
    return;
  }

  removePlayerFromGroup(message.author.id, groupId);

  // Send user a DM confirming that they've left the group
  message.author.send(`You have left the group \`${group.groupName}\``);
};
