import express from "express";
import { getImportRuns } from "../controllers/importRunController.js";

const importRunsRouter = express.Router();

importRunsRouter.get("/", getImportRuns);

export default importRunsRouter;
