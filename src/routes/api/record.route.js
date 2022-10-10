import { Router } from "express";
import { getAllRecords, postNewRecord, getRecordsByFilter } from "../../controllers/record.controller.js";
import { groupRecords as ex_groupRecords } from "../../controllers/external.controller.js";

const router = Router();

// these 2 endopoints are just for filling data for development (to fill the database with random records)
router.route("/").get(getAllRecords).post(postNewRecord);

// this is the endpoint that should be used
router.route("/internalService").get(getRecordsByFilter)

// this endpoint that simulates external service for only grouping records by year
router.route("/externalService").post(ex_groupRecords)

export default router;
