import logger from "../config/logger.js";
import httpStatus from "http-status";

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  const response = { code: statusCode, message };

  logger.error(`Error: ${message}, Status Code: ${statusCode}`);

  res.status(statusCode).send(response);
};
