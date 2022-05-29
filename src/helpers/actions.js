import { ScanCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDbClient } from './DynamoDbClient';
import { v4 as uuidv4 } from 'uuid';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const fetchData = async (tableName) => {
   const client = dynamoDbClient();
   const data =  await client.send(new ScanCommand({TableName: tableName}))
   const dataTransform = data.Items.map(i => unmarshall(i))
   console.log("Se busca en base de datos")
   return dataTransform;
}

export const fetchById = async (tableName, id) => {
   const client = dynamoDbClient();
   const data =  await client.send(new GetItemCommand({TableName: tableName, Key: {
      id: { S: id }
   } }))
   const dataTransform = unmarshall(data.Item)
   console.log("Se busca en base de datos")
   return dataTransform;
}
export const putData = async(tableName, item) => {
   const client = dynamoDbClient();
   if(!item?.id) item.id = uuidv4();
   console.log("Se graba en base de datos")
   return client.send(new PutCommand({TableName: tableName, Item:  item }))
}

export const deleteById = async (tableName, id) => {
   const client = dynamoDbClient();
   console.log("Se busca en base de datos")
   await client.send(new DeleteItemCommand({TableName: tableName, Key: {
      id: { S: id }
   } }))
}