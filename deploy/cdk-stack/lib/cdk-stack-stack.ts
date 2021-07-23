import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';
// import * as cr from '@aws-cdk/custom-resources';
import * as lambda from '@aws-cdk/aws-lambda';
// import * as iam from '@aws-cdk/aws-iam';
// import * as ssm from '@aws-cdk/aws-ssm';
// import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
// import { AwsCustomResource, AwsCustomResourcePolicy } from '@aws-cdk/custom-resources';
import { Duration } from '@aws-cdk/aws-ec2/node_modules/@aws-cdk/core';

/**
 * TODO:
 *  Change lambda from being within the VPC to connecting to
 *  the RDS through a VPC endpoint
 */

export class CdkStackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // declare a new vpc to be used
    // should probably specify config so we don't use NAT gateways
    const vpc = new ec2.Vpc(this, 'VPC');

    const database = 'dreamjobDB'

    // declare a database instance
    const instance = new rds.DatabaseInstance(this, 'Dreamjob', {
      databaseName: database,
      // set the engine
      engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_5_7_33 }),
      // set the datbase size
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      // set port
      port: 3306,
      // set storage
      allocatedStorage: 20, // set to minimum
      // set credentials
      credentials: rds.Credentials.fromGeneratedSecret('admin'), // will default to 'admin' username and generated password
      // credentials: creds,
      vpc: vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE // set the vpc type
      }
    });

    const migrateDatabase = new lambda.Function(this, 'MigrateHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      vpc: instance.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE
      },
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../db')), // make this path in a more bullet proof way
      handler: 'lambda/migrateCloud.handler',
      environment: {
        DATABASE_SECRETS_ARN: instance.secret?.secretArn || ''
      },
      timeout: Duration.minutes(15) // set max timeout
    });

    // allow the lambda to read the database secrets
    instance.secret?.grantRead(migrateDatabase);

    // set the database to accept connections from the lambda
    instance.connections.allowFrom(migrateDatabase, ec2.Port.tcp(3306));

    // set the lambda to allow connections to the database
    migrateDatabase.connections.allowTo(instance, ec2.Port.tcp(3306));

    // output the arn of the db secrets
    new cdk.CfnOutput(this, 'DbSecretsRef', {
      value: instance.secret?.secretArn || '',
      description: 'The arn of the database secrets',
      exportName: 'DbSecretsArn'
    })

    // // Custom resource?
    // new AwsCustomResource(this, 'MigrateDB', {
    //   policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
    //     resources: AwsCustomResourcePolicy.ANY_RESOURCE // change later
    //   }), // fix
    //   onCreate: {
    //     service: 'Lambda',
    //     action: 'invoke', // what to call this
    //     parameters: {
    //       CLIENT: 'mysql',
    //       DB_NAME: database,
    //       DB_HOST: instance.dbInstanceEndpointAddress,
    //       DB_PORT: instance.dbInstanceEndpointPort,
    //       DB_USER: creds.username,
    //       PASSWORD: creds.password
    //     }
    //   }
    // })
  }
}
