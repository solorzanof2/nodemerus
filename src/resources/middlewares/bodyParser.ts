import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Middleware } from '../libs/middlify/core/typings/Middleware';


export const bodyParserMiddleware: Middleware = async (event: APIGatewayEvent, context: Context, next: APIGatewayProxyHandler): Promise<APIGatewayProxyResult> => {

  if (['POST', 'PUT', 'PATCH'].includes(event.httpMethod) && event.body) {
    try {
      event['payload'] = JSON.parse(event.body);
    }
    catch (error) {
      console.error(error);
      return Promise.resolve({
        statusCode: 400,
        body: '400 Bad Request'
      });
    }
  }

  const result = await next(event, context, null);
  return (result) ? result : null;
};