import { Middleware } from './core/typings/Middleware';
import { APIMiddlify } from './core/typings/Middlify';
import { APIGatewayProxyHandler, APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { MiddlewareChain } from './core/typings/MiddlewareChain';


export const Middlify: APIMiddlify = (handler: APIGatewayProxyHandler, middlewares: Middleware[]): APIGatewayProxyHandler => {
  return (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const middlewareChain: MiddlewareChain = ([initial, ...rest]): APIGatewayProxyHandler => {
      if (!initial) {
        return handler;
      }

      return async (innerEvent: APIGatewayEvent, innerContext: Context): Promise<APIGatewayProxyResult> => {
        try {
          return initial(innerEvent, innerContext, middlewareChain(rest));
        }
        catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return (async (m: Middleware[], e: APIGatewayEvent, c: Context): Promise<APIGatewayProxyResult> => {
      try {
        const result = middlewareChain(m)(e, c, null);
        return (result) ? result : null;
      }
      catch (error) {
        return Promise.reject(error);
      }
    })(middlewares, event, context);
  }
}