import { ScanCommand, PutItemCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDbClient } from './DynamoDbClient';
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (tableName) => {
   const client = dynamoDbClient();
   return client.send(new ScanCommand({TableName: tableName}))
}

export const putData = async(tableName, item) => {
   const client = dynamoDbClient();
   if(!item?.id) item.id = uuidv4();
   return client.send(new PutCommand({TableName: tableName, Item:  item }))
}