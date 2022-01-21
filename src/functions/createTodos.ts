import { document } from 'src/utils/dynamodbClient';
import { v4 as uuidV4 } from 'uuid';

interface ICreateTodo{
  title: string;
  deadline: Date;
}

export const handle = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document.put({
    TableName: "todos",
    Item: {
        id: uuidV4(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "todo created"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}