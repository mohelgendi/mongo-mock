import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { getRecords, addRandomRecord, getFilteredRecords } from "../services/record.service.js";
import * as dotenv from "dotenv";

dotenv.config();

const NAME_KEY = process.env.NAME_KEY,
  CODE_KEY = process.env.CODE_KEY;

// for development purpose
export const getAllRecords = catchAsync(async (req, res, err) => {
  const result = await getRecords();
  res.send(result);
});

// for development purpose
export const postNewRecord = catchAsync(async (req, res) => {
  const result = await addRandomRecord();
  res.send(result);
});

export const getRecordsByFilter = catchAsync(async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  
  if(!from || !to) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide from and to dates");
  }

  if (isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid dates");
  }

  if(from > to) {
    throw new ApiError(httpStatus.BAD_REQUEST, "From date cannot be greater than to date");
  }
  
  const FILTER = { from, to, name: NAME_KEY, code: CODE_KEY };

  const result = await getFilteredRecords(FILTER);

  res.send(result);

});
