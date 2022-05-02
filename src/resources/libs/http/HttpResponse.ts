import { AppResponse } from "./AppResponse";
import { HttpStatus } from "./HttpStatus";
import { ResponseHeader } from "./ResponseHeader";


export class HttpResponse {
  statusCode: number;
  headers: ResponseHeader;
  body: string;

  constructor(payload: any = {}, status: number = HttpStatus.Ok, headers: ResponseHeader) {
    this.statusCode = HttpStatus.Ok;
    const responseHeader: ResponseHeader = {
      ...headers,
      'Access-Control-Allow-Origin': process.env.HTTP_ORIGIN,
      'Access-Control-Allow-Credentials': true,
    };
    this.headers = responseHeader;
    this.body = this.appResponse(payload, status);
  }

  private appResponse(payload: any, status: number): string {
    const appResponse = <AppResponse>{
      status,
      payload,
    };
    return JSON.stringify(appResponse);
  }
}