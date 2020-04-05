import { Group } from '@lfg/types';
import { Snowflake } from 'discord.js';

export const getGroup = (groupId: string): Group | undefined => {
  // TODO: Return a group for the given id
  return {
    channelId: '',
    groupName: '',
    ownerUserId: '',
    players: [],
    startTime: new Date()
  };
};

export const listGroups = (channelId: Snowflake) => {
  //TODO: List all groups associated with the given channel ID
};

export const createGroup = (group: Group) => {
  // TODO: Create a group
};

export const addPlayerToGroup = (userId: Snowflake, groupId: string) => {
  // TODO: Add player to a group
};

export const removePlayerFromGroup = (userId: Snowflake, groupId: string) => {
  // TODO: remove player from a group
};

export const deleteGroup = (groupId: string) => {
  // TODO: delete a group
};

export const getStartingSoonGroups = (now: Date): Group[] => {
  // TODO: Return all groups starting 15 minutes from now (but not sooner)
  return [];
};

export const getStartingGroups = (now: Date): Group[] => {
  // TODO: Return all groups that started in the last minute
  return [];
};

export const removeStartedGroups = (now: Date) => {
  // TODO: Remove all groups that have already started
};
