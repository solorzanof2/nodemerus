import { Middleware } from './Middleware';
import { APIGatewayProxyHandler } from 'aws-lambda';


export type MiddlewareChain = (middlewares: Middleware[]) => APIGatewayProxyHandler;