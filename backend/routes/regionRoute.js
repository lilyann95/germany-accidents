import express from "express";
import { getRegions } from "../controllers/regionController.js";

const regionRouter = express.Router();

regionRouter.get("/", getRegions);

export default regionRouter;
