import { APIGatewayEvent } from 'aws-lambda';


export interface APIGatewayEventV2<T> extends APIGatewayEvent {
  payload: T;
}
