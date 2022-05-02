import { APIGatewayEvent, Context, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';


export type Middleware = (event: APIGatewayEvent, context: Context, next: APIGatewayProxyHandler) => Promise<APIGatewayProxyResult>;
