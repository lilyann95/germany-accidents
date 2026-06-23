import express from "express";
import {
  getAccidents,
  getAccidentsCount,
  getAccidentRankingStats,
  getBicycleAccidentCount,
  getMunicipalityAccidents,
} from "../controllers/accidentController.js";

const accidentRouter = express.Router();

accidentRouter.get("/", getAccidents);
accidentRouter.get("/count", getAccidentsCount);
accidentRouter.get("/rankings", getAccidentRankingStats);
accidentRouter.get("/bicycleCount", getBicycleAccidentCount);
accidentRouter.get("/municipalityAccident", getMunicipalityAccidents);

export default accidentRouter;
