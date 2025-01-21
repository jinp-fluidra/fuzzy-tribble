import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Tags } from 'aws-cdk-lib';

interface JinalProps extends cdk.StackProps {
  bucketName: string;
  dynamoDBTableName: string;
  bucketName2: string;
}

export class Jinal extends cdk.Stack {
  constructor(scope: Construct, id: string, props: JinalProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Define S3 Bucket
    const bucket = new s3.Bucket(this, 'Jin-Test', {
      bucketName: props.bucketName,
      versioned: true, // Enable versioning
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Automatically delete bucket when stack is deleted
    });

    Tags.of(bucket).add('Environment','test');
    Tags.of(bucket).add('Owner','DevOps');
    Tags.of(bucket).add('CreatedBy','JinalP');
    Tags.of(bucket).add('Project','TestDemo');
    Tags.of(bucket).add('Name','Jin-Test');
  
    // Define DynamoDB Table
    const table = new dynamodb.Table(this, 'test-table', {
      tableName: props.dynamoDBTableName,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING }, // Optional sort key
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // On-demand pricing
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Automatically delete table when stack is deleted
    });

    Tags.of(table).add('Environment','test');
    Tags.of(table).add('Owner','DevOps');
    Tags.of(table).add('CreatedBy','JinalP');
    Tags.of(table).add('Project','TestDemo');
    Tags.of(table).add('Name','test-table');

    const bucket2 = new s3.Bucket(this, 'Jin-Bucket', {
      bucketName: props.bucketName2,
      versioned: true, // Enable versioning
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Automatically delete bucket when stack is deleted
    });

    // Output the bucket name and table name
    new cdk.CfnOutput(this, 'Jin-Test3', {
      value: bucket.bucketName,
      description: 'The name of the S3 bucket',
    });

    new cdk.CfnOutput(this, 'test-table2', {
      value: table.tableName,
      description: 'The name of the DynamoDB table',
    });


    // example resource
    // const queue = new sqs.Queue(this, 'MyCdkProjectQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
