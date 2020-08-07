import { Group, IGroup } from '@lfg/types';
import { User } from 'discord.js';
import IGroupService, { IGroupFilters } from './IGroupService';

export default class DdbGroupService /* implements IGroupService */ {
  /**
   * Get the group with the given ID
   * @param groupId The ID of the group to get
   */
  public getGroup(groupId: string) {
    throw new Error(`Not implemented yet`);
  }

  /**
   * List groups for a given channel
   *
   * @param filters The ID of the channel to list groups for
   */
  public listGroups(filters: IGroupFilters) {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Create a group
   *
   * @param group A group definition object to creat the group from
   */
  public createGroup(group: IGroup) {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Update a group
   *
   * @param group The group to update
   */
  public updateGroup(group: Group) {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Delete a group
   *
   * @param executingUser The user requesting deletion
   * @param groupId The ID of the group to delete
   */
  public deleteGroup(executingUser: User, groupId: string) {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Get groups starting 15 minutes from now (but not sooner)
   */
  public getStartingSoonGroups() {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Get groups that have started in the last minute
   */
  public getStartingGroups() {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Remove groups that have already started
   */
  public removeStartedGroups() {
    throw new Error(`Not implemented yet`);
  }
}
