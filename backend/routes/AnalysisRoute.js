import express from "express";
import { getAnalysisTrafficRisk } from "../controllers/analysisController.js";

const analysisRouter = express.Router();

analysisRouter.get("/accidents-per-100k-cars", getAnalysisTrafficRisk);

export default analysisRouter;
