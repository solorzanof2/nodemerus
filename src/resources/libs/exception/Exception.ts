import { HttpStatus } from '../http/HttpStatus';


export class Exception extends Error {
  code: HttpStatus = HttpStatus.Conflict;
  log: string = "";

  constructor();
  constructor(message: string);
  constructor(message: string, code: HttpStatus);
  constructor(message: string, code: HttpStatus, log: string);
  constructor(message?: string, code?: HttpStatus, log?: string) {
    super(message);

    if (code) {
      this.code = code;
    }

    if (log) {
      this.log = log;
    }
  }
}

export class TypeException extends Error { }