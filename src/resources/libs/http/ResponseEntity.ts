import { ErrorTypes } from '../exception/ErrorTypes';
import { Exception } from '../exception/Exception';
import { HttpResponse } from "./HttpResponse";
import { HttpStatus } from "./HttpStatus";
import { ResponseHeader } from "./ResponseHeader";


export class ResponseEntity {

  private static response(message: any, statusCode: number, headers: ResponseHeader, log: string = ''): Promise<HttpResponse> {
    if (log) console.log(`Api Error: ${log}`);
    return Promise.resolve(new HttpResponse(message, statusCode, headers));
  }

  public static ok(message: any = {}, headers: ResponseHeader = {}): Promise<HttpResponse> {
    return ResponseEntity.response(message, HttpStatus.Ok, headers);
  }

  public static noContent(): Promise<HttpResponse> {
    return ResponseEntity.response(null, HttpStatus.NoContent, {});
  }

  public static conflict(message: any = {}, log: string = ''): Promise<HttpResponse> {
    return ResponseEntity.response(message, HttpStatus.Conflict, {}, log);
  }

  public static serverError(message: any = {}, log: string = ''): Promise<HttpResponse> {
    return ResponseEntity.response(message, HttpStatus.ServerError, {}, log);
  }

  public static error(error: Exception | Error): Promise<HttpResponse> {
    if (error instanceof Exception) {
      const exception = <Exception>error;
      return ResponseEntity.response(exception.message, exception.code, {}, exception.log);
    }
    return ResponseEntity.serverError(ErrorTypes.ServerError, error.message);
  }

}