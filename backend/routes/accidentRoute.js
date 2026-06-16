import express from "express";
import { getAccidents } from "../controllers/accidentController.js";

const accidentRouter = express.Router();

accidentRouter.get("/", getAccidents);

export default accidentRouter;
