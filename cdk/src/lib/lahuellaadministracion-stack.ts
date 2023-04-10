import {  FunctionUrlAuthType,  Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {  Duration,  Stack, StackProps } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { HttpMethod } from 'aws-cdk-lib/aws-events';

export class HuellaAdministracion extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const secret = this.node.tryGetContext("API_KEY");
    const project = this.node.tryGetContext("PROJECT");
    //Lambdas
    const fetchAll = `lambda-fetchall-${project}`;
    const fetchAllLambda = new Function(this, fetchAll, {
      environment: {
        API_KEY: secret
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: fetchAll,
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/fetchData/")
    });
    fetchAllLambda.addFunctionUrl({ authType: FunctionUrlAuthType.NONE , cors: {allowCredentials: true, allowedMethods: [HttpMethod.GET], allowedOrigins: ["http://localhost:3000", "https://juancruztrinidad.github.io"]}})

    const nameFetchById = `fetchbyid-${project}`;
    const fetchById= new Function(this,nameFetchById, {
      environment: {
        API_KEY: secret
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: nameFetchById,
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/fetchById/")
    });
    fetchById.addFunctionUrl({ authType: FunctionUrlAuthType.NONE,  cors: {allowCredentials: true, allowedMethods: [HttpMethod.GET], allowedOrigins: ["http://localhost:3000", "https://juancruztrinidad.github.io"]} })

    const namePutData = `putdata-${project}`;
    const putData= new Function(this, namePutData, {
      environment: {
        API_KEY: secret
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: namePutData,
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/putData/")
    });
    putData.addFunctionUrl({ authType: FunctionUrlAuthType.NONE,  cors: {allowCredentials: true, allowedMethods: [HttpMethod.POST, HttpMethod.PUT], allowedOrigins: ["http://localhost:3000", "https://juancruztrinidad.github.io"]}})

    const nameDeleteById = `deletebyid-${project}`;
    const deleteById= new Function(this,nameDeleteById , {
      environment: {
        API_KEY: secret
      },
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      functionName: nameDeleteById,
      memorySize: 128,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      code: Code.fromAsset("../backend/deleteById/")
    });
    deleteById.addFunctionUrl({ authType: FunctionUrlAuthType.NONE,  cors: {allowCredentials: true, allowedMethods: [HttpMethod.DELETE, HttpMethod.GET], allowedOrigins: ["http://localhost:3000", "https://juancruztrinidad.github.io"] }})

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
