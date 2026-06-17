import express from "express";
import {
  getMeta,
  getMetaEarliestYear,
  getMetaRegionAvailability,
} from "../controllers/metaController.js";

const metadataRouter = express.Router();

metadataRouter.get("/", getMeta);
metadataRouter.get("/earliest-year", getMetaEarliestYear);
metadataRouter.get(`/region/:state_name`, getMetaRegionAvailability);

export default metadataRouter;
