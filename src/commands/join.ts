import IGroupService from '@lfg/services/IGroupService';
import InMemoryGroupService from '@lfg/services/InMemoryGroupService';
import { Config } from '@lfg/types';
import { Message, TextChannel } from 'discord.js';

// TODO: When DDB stuff gets more firm the concrete service should be injected somehow per some config
const groupService: IGroupService = new InMemoryGroupService();

export default (message: Message, config: Config) => {
  const splitMessage = message.content.split(/\s+/);
  const groupId = splitMessage[1];

  const group = groupService.getGroup(groupId);

  // No group with the given ID
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
    !groupChannel.members.some((member) => member.id === message.author.id)
  ) {
    message.author.send(
      `Couldn't find group for ID ${groupId}. Did you type it in correctly?`
    );
    return;
  }

  // User should only use this command either in the channel where the room is created or in a DM
  if (message.channel.type !== 'dm' && message.channel.id !== group.channelId) {
    message.author.send(
      'You should only use the join command in either a DM or the channel where the group was created.'
    );
  }

  // Can't join the same group twice
  if (group.players.includes(message.author.id)) {
    message.author.send(`You're already in the group \`${group.groupName}\`.`);
    return;
  }

  group.addPlayer(message.author.id);
  groupService.updateGroup(group);

  // DM the user confirming they've been added to the group
  message.author.send(`You have joined the group \`${group.groupName}\``);
};
