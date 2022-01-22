const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

export const dynamoDbClient = () => new DynamoDBClient({   
  region: 'us-east-2',
  credentials: {
    secretAccessKey: process.env.ACCESS_KEY,
    accessKeyId: process.env.KEY_ID 
  }
});
 