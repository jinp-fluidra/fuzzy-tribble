#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Jinal } from '../lib/my-cdk-project-stack';
import * as fs from 'fs';

const parameters = JSON.parse(fs.readFileSync('parameters.json','utf8'));

const app = new cdk.App();
new Jinal(app, 'Jinal1Test', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  
  bucketName: parameters.bucketName,
  dynamoDBTableName: parameters.dynamoDBTableName,
  bucketName2: parameters.bucketName2
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});