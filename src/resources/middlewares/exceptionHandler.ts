import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Middleware } from '../libs/middlify/core/typings/Middleware';


export const exceptionHandlerMiddleware: Middleware = async (event: APIGatewayEvent, context: Context, next: APIGatewayProxyHandler): Promise<APIGatewayProxyResult> => {
  const logAndDie = (origin: string, error: any) => {
    console.log(origin, error);
    process.exit(1);
  }

  const exception = 'uncaughtException';
  const rejection = 'unhandledRejection';

  process.on(exception, (error, origin) => {
    logAndDie(origin, error);
  });

  process.on(rejection, async (error, origin) => {
    logAndDie(await origin, error);
  });

  const result = await next(event, context, null);

  process.removeAllListeners(exception);
  process.removeAllListeners(rejection);
  
  return (result) ? result : null;
}