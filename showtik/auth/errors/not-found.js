import { CustomError } from "./custom-api";

export class NotFoundError extends CustomError {
  error = "Route not found or does not exist.";
  constructor(message) {
    super(!!message ? message : "Route not found or does not exist.");
  }

  statusCode = 404;
  serializedErrors = () => [{ error: this.error }];
}
