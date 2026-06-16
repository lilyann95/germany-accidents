import express from "express";
import { getMetadata } from "../controllers/metadataController.js";

const metadataRouter = express.Router();

metadataRouter.get("/", getMetadata);

export default metadataRouter;
