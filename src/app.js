import * as dotenv from "dotenv";

dotenv.config();

import express, { json, urlencoded } from "express";

import mongoSanitize from "express-mongo-sanitize";

import cors from "cors";

import routes from "./routes/api/index.js";

import { errorHandler } from "./middlewares/error.js";

import { notFoundHandler } from "./middlewares/notFound.js";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(mongoSanitize());

app.options("*", cors());

app.use("/api", routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;