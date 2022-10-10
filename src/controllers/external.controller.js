import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { groupRecordsByYear } from "../services/external.service.js";


export const groupRecords = catchAsync(async (req, res, err) => {
  const records = req.body.records;

  if (!records) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide records to group");
  }

 const result = await groupRecordsByYear(records);
  
  res.send(result);
});

