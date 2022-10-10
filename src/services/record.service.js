import * as dotenv from "dotenv";
import fetch from "node-fetch";
import Record from "../models/record.model.js";
import { generateRandomDate, generateRandomText } from "../utils/helpers.js";

dotenv.config();

const NAME_KEY = process.env.NAME_KEY,
  CODE_KEY = process.env.CODE_KEY,
  API_URL = process.env.API_URL;

export const getRecords = async () => {
  const records = await Record.find();
  return records;
};

export const addRandomRecord = async () => {
  const newRecord = await Record.create({
    id: 0, // incremental ID is generted in the backgorund
    date: generateRandomDate(),
    name: generateRandomText(NAME_KEY),
    code: CODE_KEY,
  });

  return newRecord;
};

export const getFilteredRecords = async (filter) => {
  const records = await Record.find({
    id: { $gte: 1 }, // although we know ID is never null or negative, always +0
    date: { $gte: filter.from, $lte: filter.to },
    name: { $regex: filter.name, $options: "i" },
    code: { $regex: filter.code, $options: "i" },
  });

  const response = await fetch(API_URL+"/record/externalService", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({records: records}),
  });
  const result = await response.json();

  return result;
};
