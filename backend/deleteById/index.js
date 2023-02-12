const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async function (params) {
  if (!params?.headers["api-key"] === process.env.API_KEY)
    return {
      statusCode: 403,
      body: "Acceso denegado. Falta api-key",
    };
  const body = JSON.parse(params.body);
  const client = new DynamoDBClient({
    region: "us-east-2",
  });
  await client.send(new DeleteItemCommand({TableName: body.tableName, Key: {
    id: { S: body.id }
 } }))
  console.log("Se busca en base de datos");
  return {
    statusCode: 200,
    body: body.id,
  };
};
