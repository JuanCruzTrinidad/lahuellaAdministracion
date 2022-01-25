const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

export const dynamoDbClient = () => new DynamoDBClient({   
  region: 'us-east-2',
  credentials: {
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    accessKeyId: process.env.REACT_APP_KEY_ID 
  }
});
 