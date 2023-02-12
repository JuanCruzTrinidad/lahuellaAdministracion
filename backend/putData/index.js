const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4 : uuidv4} = require('uuid') ;

exports.handler = async function (params) {
  if (!params?.headers["api-key"] === process.env.API_KEY)
    return {
      statusCode: 403,
      body: "Acceso denegado. Falta api-key",
    };
  const body = JSON.parse(params.body);
  const item = body?.item;
  const client = new DynamoDBClient({
    region: "us-east-2",
  });
  if(!item?.id) item.id = uuidv4();
  console.log("Se graba en base de datos")
  const response = await client.send(new PutCommand({TableName: body.tableName, Item:  item }))
  return {
    statusCode: 200,
    body: response,
  };
};
