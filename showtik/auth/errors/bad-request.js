import { CustomError } from "./custom-api";

export class BadRequestError extends CustomError {
  errors;
  constructor(errors) {
    this.errors = errors;
    super("Invalid request body.");
  }
  statusCode = 400;
  serializedErrors = () =>
    this.errors.map((e) => ({
      error: e.msg,
      field: e.param,
    }));
}
