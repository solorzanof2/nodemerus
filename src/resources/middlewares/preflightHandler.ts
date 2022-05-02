import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { Middleware } from "../libs/middlify/core/typings/Middleware";


export const preflightMiddleware: Middleware = async (event: APIGatewayEvent, context: Context, next: APIGatewayProxyHandler): Promise<APIGatewayProxyResult> => {

  if (event.httpMethod !== 'OPTIONS') {
    const result = await next(event, context, null);
    return (result) ? result : null;
  }
  
  const headers = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": process.env.HTTP_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date, X-Amz-Security-Token, Authorization, X-Api-Key, X-Requested-With, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Max-Age": 86400,
  };

  return {
    statusCode: 204,
    body: null,
    headers,
  };
}