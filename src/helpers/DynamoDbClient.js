const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

console.log("Aparecio la variable", process.env.REACT_APP_VARIABLE)
export const dynamoDbClient = () => new DynamoDBClient({   
  region: 'us-east-2',
  credentials: {
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY || 'prueba123',
    accessKeyId: process.env.REACT_APP_KEY_ID || 'contra123'
  }
  // endpoint: 'http://localhost:8000'
});
 