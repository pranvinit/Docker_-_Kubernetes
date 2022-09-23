import { CustomError } from "./custom-api";
import { ValidationError } from "express-validator";

export class BadRequestError extends CustomError {
  constructor(private errors: ValidationError[]) {
    super("Invalid request body.");
  }
  statusCode = 400;
  serializedErrors = () =>
    this.errors.map((e) => ({
      error: e.msg,
      field: e.param,
    }));
}
