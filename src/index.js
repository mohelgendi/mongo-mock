import { connect } from "mongoose";
import app from "./app.js";
import logger from "./config/logger.js";

const DB_STRING = process.env.DB_STRING || "mongodb://localhost:27017/records";

const PORT = process.env.PORT || 3000;

let server;

connect(DB_STRING).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
});
