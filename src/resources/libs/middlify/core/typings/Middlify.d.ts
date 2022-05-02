import { Middleware } from './Middleware';
import { APIGatewayProxyHandler } from 'aws-lambda';


export type APIMiddlify = (handler: APIGatewayProxyHandler, middlewares: Middleware[]) => APIGatewayProxyHandler;