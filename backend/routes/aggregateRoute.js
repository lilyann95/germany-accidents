import express from "express";
import { getAggregates } from "../controllers/aggregateController.js";

const aggregateRouter = express.Router();

aggregateRouter.get("/", getAggregates);

export default aggregateRouter;
