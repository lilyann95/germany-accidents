import express from "express";
import {
  getAccidents,
  getAccidentsCount,
  getAccidentsStats,
} from "../controllers/accidentController.js";

const accidentRouter = express.Router();

accidentRouter.get("/", getAccidents);
accidentRouter.get("/count", getAccidentsCount);
accidentRouter.get("/stats", getAccidentsStats);

export default accidentRouter;
