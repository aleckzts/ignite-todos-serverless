import { document } from 'src/utils/dynamodbClient';

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: "todos",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
        ":user_id": user_id
    }
  }).promise();

  const todos = response.Items;

  if(!todos){
    return{
      statusCode: 204,
      body: JSON.stringify({
          error: "todos not found"
      }),
      headers:{
          "Content-Type": "application/json"
      }
    }
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      todos: todos
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}