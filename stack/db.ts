import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class BotDbStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props);

    const lfgTable = new dynamodb.Table(this, 'Lfg', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    new cdk.CfnOutput(this, 'LfgTableName', {
      value: lfgTable.tableName,
      exportName: 'LfgTableName',
    });

    new cdk.CfnOutput(this, 'LfgTableArn', {
      value: lfgTable.tableArn,
      exportName: 'LfgTableArn',
    });
  }
}
