import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Middleware } from '../libs/middlify/core/typings/Middleware';


export const paramsParserMiddleware: Middleware = async (event: APIGatewayEvent, context: Context, next: APIGatewayProxyHandler): Promise<APIGatewayProxyResult> => {

  const requestMapping = {} as RequestMapping;
  const queryStrings = event.queryStringParameters;

  requestMapping.hasPaths = false;
  requestMapping.hasQuery = false;
  
  if (queryStrings) {
    requestMapping.query = {} as GenericDTO;
    for (const property in queryStrings) {
      requestMapping.query[property] = queryStrings[property];
      requestMapping.hasQuery = true;
    }
  }

  const pathParameters = event.pathParameters;

  if (pathParameters) {
    requestMapping.path = {} as GenericDTO;
    for (const property in pathParameters) {
      requestMapping.path[property] = pathParameters[property];
      requestMapping.hasPaths = true;
    }
  }

  event['requestMapping'] = {
    ...requestMapping,
  }

  const result = await next(event, context, null);
  return (result) ? result : null;
}

/**
 * ### Request Mapping
 *
 * - query: any
 *
 * - path: any
 *
 * - hasQuery: boolean
 *
 * - hasPaths: boolean
 */
export interface RequestMapping {
  query: any;
  path: any;
  hasQuery: boolean;
  hasPaths: boolean;
}

type GenericDTO = { [key: string]: string };