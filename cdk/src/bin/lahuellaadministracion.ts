#!/usr/bin/env node
import 'source-map-support/register';
import { App, Tags } from 'aws-cdk-lib';
import { HuellaAdministracion } from '../lib/lahuellaadministracion-stack';

let app = new App();

async function Main() {
  const projectName = app.node.tryGetContext("ProjectName");
  const product = app.node.tryGetContext("Product");
  const env = app.node.tryGetContext("Environment");
  
 new HuellaAdministracion(app, `stackcdk-lahuellaadministracion`  , {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    }
  });
}

Main();