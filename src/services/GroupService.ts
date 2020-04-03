import { Group } from '@lfg/types';
import { Snowflake } from 'discord.js';

export const CreateGroup = (group: Group) => {
  // Create a group
};

export const GetStartingSoonGroups = (now: Date): Group[] => {
  // TODO: Return all groups starting 15 minutes from now (but not sooner)
  return [];
};

export const GetStartingGroups = (now: Date): Group[] => {
  // TODO: Return all groups that started in the last minute
  return [];
};

export const RemoveStartedGroups = (now: Date) => {
  // TODO: Remove all groups that have already started
};

export const AddPlayerToGroup = (groupId: string, userId: Snowflake) => {
  // TODO: Remove player from group
};
