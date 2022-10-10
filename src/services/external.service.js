import _ from "lodash";
import { getYear } from "../utils/helpers.js";

export const groupRecordsByYear = async (records) => {
  const grouped = _.groupBy(records, getYear);

  const result = [];

  Object.keys(grouped).forEach((year) => {
    result.push({ year, quantity: grouped[year].length });
  });

  return result;
};
