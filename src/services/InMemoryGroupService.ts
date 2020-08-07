import { Group, IGroup } from '@lfg/types';
import { User } from 'discord.js';
import * as moment from 'moment';
import { generate as generateShortId } from 'shortid';
import IGroupService, { IGroupFilters } from './IGroupService';

export default class InMemoryGroupService implements IGroupService {
  /**
   * In memory cache that keeps a mapping from a groups ID to the group definition
   */
  private readonly groupCache = new Map<string, Group>();

  /**
   * Get the group with the given ID
   * @param groupId The ID of the group to get
   */
  public getGroup(groupId: string) {
    const group = this.groupCache.get(groupId);

    if (!group) {
      throw new Error(`The group with ID ${groupId} does not exist`);
    }

    return group;
  }

  /**
   * List groups with optional filtering
   *
   * @param filters The ID of the channel to list groups for
   */
  public listGroups(filters?: IGroupFilters) {
    const groups: Group[] = [];
    for (const group of this.groupCache.values()) {
      if (filters) {
        const { channelId, userId } = filters;

        if (channelId && group.channelId !== channelId) {
          break;
        }

        if (userId && !group.players.includes(userId)) {
          break;
        }
      }

      groups.push(group);
    }

    return groups;
  }

  /**
   * Create a group
   *
   * @param groupDefinition A group definition object to creat the group from
   */
  public createGroup(groupDefinition: IGroup) {
    let id = '';
    do {
      id = generateShortId().substring(0, 4);
    } while (this.groupCache.has(id));

    const group = new Group({ ...groupDefinition, groupId: id });
    this.groupCache.set(id, group);
    return group;
  }

  /**
   * Update a group
   *
   * This is really a no-op in the in-memory service because the references to internal data structures don't change.
   *
   * @param group The group to update
   */
  public updateGroup(group: Group) {
    if (!group.groupId || !this.groupCache.has(group.groupId)) {
      throw new Error(`The group does not have a valid ID.`);
    }

    this.groupCache.set(group.groupId, group);
    return group;
  }

  /**
   * Delete a group
   *
   * @param executingUser The user requesting deletion
   * @param groupId The ID of the group to delete
   */
  public deleteGroup(executingUser: User, groupId: string) {
    const group = this.groupCache.get(groupId);

    if (!group) {
      throw new Error(`${groupId} does not exist.`);
    }

    if (group.ownerUserId !== executingUser.id) {
      throw new Error('Groups can only be removed by their creator.');
    }

    this.groupCache.delete(groupId);
    return group;
  }

  /**
   * Get groups starting 15 minutes from now (but not sooner)
   */
  public getStartingSoonGroups() {
    const groups = [...this.groupCache.values()].filter(
      (group: Group) =>
        !group.hasHad15MinuteUpdate &&
        moment().add(15, 'minutes').isAfter(group.startTime)
    );

    groups.forEach((group) => {
      group.hasHad15MinuteUpdate = true;
    });

    return groups;
  }

  /**
   * Get groups that have started in the last minute
   */
  public getStartingGroups() {
    const groups = [...this.groupCache.values()].filter(
      (group: Group) =>
        !group.hasHadStartingUpdate && moment().isAfter(group.startTime)
    );

    groups.forEach((group) => {
      group.hasHadStartingUpdate = true;
    });

    return groups;
  }

  /**
   * Remove groups that have already started
   */
  public removeStartedGroups() {
    for (const group of this.groupCache.values()) {
      if (group.hasHadStartingUpdate) {
        this.groupCache.delete(group.groupId as string);
      }
    }
  }
}
