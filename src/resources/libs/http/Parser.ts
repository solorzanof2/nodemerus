import { APIGatewayEvent } from 'aws-lambda';


export class Parser {

  static requestBody<T>(event: APIGatewayEvent): T {
    return JSON.parse(event.body) as T;
  }
  
}