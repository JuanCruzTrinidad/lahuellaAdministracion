#!/usr/bin/env node
import 'source-map-support/register';
import { App, Tags } from 'aws-cdk-lib';
import { HuellaAdministracion } from '../lib/lahuellaadministracion-stack';

let app = new App();

async function Main() {
 new HuellaAdministracion(app, `stackcdk-lahuellaadministracion-v2`  , {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    }
  });
}

Main();