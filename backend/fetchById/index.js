const { DynamoDBClient, ScanCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

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
  const data =  await client.send(new GetItemCommand({TableName: body.tableName, Key: {
    id: { S: body.id }
 } }))
 const dataTransform = unmarshall(data.Item)
 console.log("Se busca en base de datos")
  return {
    statusCode: 200,
    body: dataTransform,
  };
};
