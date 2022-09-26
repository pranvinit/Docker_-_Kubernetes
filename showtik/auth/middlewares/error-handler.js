import { CustomError } from "../errors";

export const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializedErrors());
  }

  res.status(500).json([{ error: "Internal server error." }]);
};
