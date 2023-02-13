const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

exports.handler = async function (params) {
  console.log(params)
  if (!params?.headers["api-key"] === process.env.API_KEY)
    return {
      statusCode: 403,
      body: "Acceso denegado. Falta api-key",
    };
  const body = JSON.parse(params.body);
  const client = new DynamoDBClient({
    region: "us-east-2",
  });
  const data = await client.send(
    new ScanCommand({ TableName: body.tableName })
  );
  const dataTransform = data.Items.map((i) => unmarshall(i));
  console.log("Se busca en base de datos");
  return {
    statusCode: 200,
    body: dataTransform
  };
};
