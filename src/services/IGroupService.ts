import { Group, IGroup } from '@lfg/types';
import { Snowflake, User } from 'discord.js';

/**
 * Filterable properties when getting groups
 *
 * At least we got it done here...if you know, you know. :D
 */
export interface IGroupFilters {
  /**
   * The channel ID to filter by.
   */
  channelId?: Snowflake;

  /**
   * The user ID to filter by. Only groups this user is in will be returned.
   */
  userId?: Snowflake;
}

export default interface IGroupService {
  /**
   * Get the group with the given ID
   * @param groupId The ID of the group to get
   */
  getGroup(groupId: string): Group;

  /**
   * List groups for a given channel
   *
   * @param filters The ID of the channel to list groups for
   */
  listGroups(filters: IGroupFilters): Group[];

  /**
   * Create a group
   *
   * @param group A group definition object to creat the group from
   */
  createGroup(group: IGroup): Group;

  /**
   * Update a group
   *
   * @param group The group to update
   */
  updateGroup(group: Group): Group;

  /**
   * Delete a group
   *
   * @param executingUser The user requesting deletion
   * @param groupId The ID of the group to delete
   */
  deleteGroup(executingUser: User, groupId: string): Group;

  /**
   * Get groups starting 15 minutes from now (but not sooner)
   */
  getStartingSoonGroups(): Group[];

  /**
   * Get groups that have started in the last minute
   */
  getStartingGroups(): Group[];

  /**
   * Remove groups that have already started
   */
  removeStartedGroups(): void;
}
