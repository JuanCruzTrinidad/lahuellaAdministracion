import {  FunctionUrlAuthType,  Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {  Duration,  Stack, StackProps } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export class HuellaAdministracion extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const secretName = `secret-apikey`;
    const secretManager = new Secret(this, secretName, {
      secretName: secretName,
      generateSecretString: {
        excludePunctuation: true,
        passwordLength: 30
      }
    });
    //Lambdas
    const fetchAll = `lambda-fetchall`;
    const fetchAllLambda = new Function(this, fetchAll, {
      environment: {
        API_KEY: secretManager.secretValue.toString()
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: fetchAll,
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/fetchData/")
    });
    fetchAllLambda.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    const fetchById= new Function(this, "fetchbyid", {
      environment: {
        API_KEY: secretManager.secretValue.toString()
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: "fetchbyid-lambda",
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/fetchById/")
    });
    fetchById.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    const putData= new Function(this, "putdata", {
      environment: {
        API_KEY: secretManager.secretValue.toString()
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: "putdata-lambda",
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/putData/")
    });
    putData.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    const deleteById= new Function(this, "deletebyid", {
      environment: {
        API_KEY: secretManager.secretValue.toString()
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: "deletebyid-lambda",
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/deleteById/")
    });
    deleteById.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    const dynamoDbAlumnos = Table.fromTableArn(
      this,
      'dynamo-alumnos',
      "arn:aws:dynamodb:us-east-2:103143100419:table/alumnos",
    );
    const dynamoDbNotas= Table.fromTableArn(
      this,
      'dynamo-notas',
      "arn:aws:dynamodb:us-east-2:103143100419:table/notas",
    );
    dynamoDbAlumnos.grantFullAccess(fetchAllLambda);
    dynamoDbNotas.grantFullAccess(fetchAllLambda);
    dynamoDbAlumnos.grantFullAccess(fetchById);
    dynamoDbNotas.grantFullAccess(fetchById);
    dynamoDbAlumnos.grantFullAccess(putData);
    dynamoDbNotas.grantFullAccess(putData);
    dynamoDbAlumnos.grantFullAccess(deleteById);
    dynamoDbNotas.grantFullAccess(deleteById);
  }
}
