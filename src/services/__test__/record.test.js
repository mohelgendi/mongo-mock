import mongoose from "mongoose";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

import { getRecords, addRandomRecord } from "../record.service.js";

const DB_STRING = process.env.DB_STRING || "mongodb://localhost:27017/records";
const CODE_KEY = process.env.CODE_KEY,
  API_URL = process.env.API_URL;

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(DB_STRING);
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

setupTestDB();

describe("MongoDB service", () => {
  describe("Record Serivces Tests", () => {
    test("Add new Record/Records", async () => {
      const record1 = await addRandomRecord();
      const record2 = await addRandomRecord();

      const res = await getRecords();
      expect(res.length).toBe(2);
      expect(record1.code).toBe(CODE_KEY);
      expect(record2.code).toBe(CODE_KEY);
    });

    // THE SERVER SHOULD BE RUNNING FOR THIS TEST TO PASS
    test("Get Grouped Records (HTTP Mock)", async () => {
      for (let i = 0; i < 10; i++) {
        await addRandomRecord();
      }

      const res = await fetch(
        API_URL + "/record/internalService?from=2000-01-01&to=2023-12-31"
      );
      const result = await res.json();
      let total = 0;
      Object.keys(result).forEach((year) => {
        total += result[year].quantity;
      });

      expect(total).toBe(10);
      expect(result).toBeInstanceOf(Array);
    });
  });
});
