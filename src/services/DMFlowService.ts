import { Snowflake } from 'discord.js';

import { DMFlow, DMFlowStep, Group } from '@lfg/types';

export const getFlowInfo = (ownerUserId: Snowflake): DMFlow | undefined => {
  // TODO: Get current step of the flow from the database
  return undefined;
};

const setNextStep = (ownerUserId: Snowflake, nextStep: DMFlowStep) => {
  // TODO: Set the next step of the flow for the given user to the given step
};

export const startFlow = (
  ownerUserId: Snowflake,
  channelId: Snowflake,
  nextStep: DMFlowStep = DMFlowStep.SET_NAME
) => {
  // TODO: Create a new flow for a the given user for a new group in the given channel
};

export const setName = (
  ownerUserId: Snowflake,
  name: string,
  nextStep: DMFlowStep = DMFlowStep.SET_TIME
) => {
  // Set the group name, but only if current step is SET_NAME
  const flowInfo = getFlowInfo(ownerUserId);

  if (!flowInfo || flowInfo.step !== DMFlowStep.SET_NAME) return;

  // TODO: database logic here
};

export const setTime = (
  ownerUserId: Snowflake,
  startTime: Date,
  nextStep: DMFlowStep = DMFlowStep.SET_PLAYER_LIMIT
) => {
  // Set the group start time, but only if current step is SET_TIME
  const flowInfo = getFlowInfo(ownerUserId);

  if (!flowInfo || flowInfo.step !== DMFlowStep.SET_TIME) return;

  // TODO: database logic here
};

export const setPlayerLimit = (
  ownerUserId: Snowflake,
  playerLimit: number,
  nextStep: DMFlowStep = DMFlowStep.CONFIRM
) => {
  // Set player limit, but only if current step is SET_PLAYER_LIMIT
  const flowInfo = getFlowInfo(ownerUserId);

  if (!flowInfo || flowInfo.step !== DMFlowStep.SET_PLAYER_LIMIT) return;

  // TODO: database logic here
};

export const getGroup = (ownerUserId: Snowflake): Group => {
  const flowInfo = getFlowInfo(ownerUserId);

  if (
    !flowInfo ||
    flowInfo.step !== DMFlowStep.CONFIRM ||
    !flowInfo.groupName ||
    !flowInfo.startTime
  )
    throw new Error('Can only get the group from a completed flow');

  return {
    channelId: flowInfo.channelId,
    groupName: flowInfo.groupName,
    ownerUserId: flowInfo.ownerUserId,
    startTime: flowInfo.startTime,
    playerLimit: flowInfo.playerLimit,
    players: []
  };
};

export const endFlow = (ownerUserId: Snowflake) => {
  // Delete the flow from the database, but only if the current step is CONFIRM
  const flowInfo = getFlowInfo(ownerUserId);

  if (!flowInfo || flowInfo.step !== DMFlowStep.CONFIRM) return;

  // TODO: database logic here
};
