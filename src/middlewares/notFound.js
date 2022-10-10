import ApiError from '../utils/ApiError.js';
import httpStatus from "http-status";

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Requested Route Not found, please check the docs."));
};
