import { ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { dynamoDbClient } from './DynamoDbClient';
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (tableName) => {
   const client = dynamoDbClient();
   return client.send(new ScanCommand({TableName: tableName}))
}

export const putData = async(tableName, item) => {
   const client = dynamoDbClient();
   return client.send(new UpdateItemCommand({TableName: tableName, Key: item?.id || uuidv4() }))
}