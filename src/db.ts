import * as AWS from 'aws-sdk';
import { memoize } from 'lodash';
import * as uuid from 'uuid/v4';

const Cfn = new AWS.CloudFormation({
  region: 'us-west-2',
});

const Ddb = new AWS.DynamoDB({
  region: 'us-west-2',
});

/**
 * Logic for this is dependent on the way the stack was configured.
 * The stack currently has a hardcoded name (Siegebot) and a hardcoded
 * output (LfgTableName). There is probably a nicer way to get/set those names.
 * More notes on that in the README for the stack generator.
 *
 * After the first call, this function should just returns the table name without
 * making another network request
 */
const getTableName = memoize(async () => {
  let tableName;
  try {
    const stacksOutput = await Cfn.describeStacks({
      StackName: 'Siegebot',
    }).promise();

    tableName = stacksOutput.Stacks?.[0]?.Outputs?.filter(
      (o) => o?.ExportName === 'LfgTableName'
    )?.[0].OutputValue;
  } catch (e) {
    console.log(e);
  }

  if (typeof tableName === 'undefined') {
    throw 'Could not find table name. Make sure the stack is actually set up.';
  }

  return tableName;
});

export const getGroupWithId = async (id: string) => {
  const { Item: group } = await Ddb.getItem({
    TableName: await getTableName(),
    Key: {
      // partition key, required for all "get" operations
      Id: {
        S: id,
      },
      // use ItemType as part of primary key to only returns groups
      ItemType: {
        S: 'group',
      },
    },
    // attributes that belong in a group
    AttributesToGet: ['id'],
  }).promise();

  // get some data from group
  // console.log(group?.['AttributeOfAGroup']);
};

export const insertGroup = async () => {
  const groupId = uuid();
  await Ddb.putItem({
    TableName: await getTableName(),
    Item: {
      Id: {
        S: groupId,
      },
      ItemType: {
        S: 'group',
      },
      // other attributes of a group
    },
  }).promise();
};

// add more DB functions here
