import { Snowflake } from 'discord.js';

export interface IGroup {
  channelId: Snowflake;
  groupId?: string;
  groupName: string;
  ownerUserId: Snowflake;
  playerLimit?: number;
  startTime: Date;
  hasHad15MinuteUpdate: boolean;
  hasHadStartingUpdate: boolean;

  players: Snowflake[];
}

export class Group implements IGroup {
  public channelId: Snowflake;
  public groupName: string;
  public ownerUserId: Snowflake;
  public startTime: Date;
  public playerLimit?: number;
  public groupId?: string;
  public hasHad15MinuteUpdate: boolean;
  public hasHadStartingUpdate: boolean;

  private playersConcrete: Snowflake[];

  constructor({
    channelId,
    groupId,
    groupName,
    ownerUserId,
    playerLimit,
    players,
    startTime,
    hasHad15MinuteUpdate,
    hasHadStartingUpdate,
  }: IGroup) {
    this.channelId = channelId;
    this.groupId = groupId;
    this.groupName = groupName;
    this.ownerUserId = ownerUserId;
    this.playerLimit = playerLimit;
    this.startTime = startTime;
    this.playersConcrete = players;
    this.hasHad15MinuteUpdate = hasHad15MinuteUpdate;
    this.hasHadStartingUpdate = hasHadStartingUpdate;
  }

  get players() {
    return [...this.playersConcrete];
  }

  /**
   * Add a player to a group
   *
   * @param userId The ID of the user to add
   */
  public addPlayer(userId: Snowflake) {
    if (this.playerLimit && this.players.length + 1 > this.playerLimit) {
      throw new Error(`${this.groupName} is full.`);
    }

    if (this.players.includes(userId)) {
      throw new Error(`You can't join a group that you're already in.`);
    }

    this.playersConcrete.push(userId);
    return this;
  }

  /**
   * Remove a player from a group
   *
   * @param userId The ID of the user to remove
   */
  public removePlayerFromGroup(userId: Snowflake) {
    if (!this.players.includes(userId)) {
      throw new Error(`You can't leave a group that you're not in.`);
    }

    const playerIdx = this.players.indexOf(userId);
    this.playersConcrete.splice(playerIdx, 1);

    return this;
  }
}
