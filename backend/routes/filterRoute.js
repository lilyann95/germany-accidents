import express from "express";
import {
  getStates,
  getmunicipality,
  getYears,
  getCategory,
  getParticipants,
  getFilterAccidentCount,
} from "../controllers/FilterController.js";

const filterRouter = express.Router();

filterRouter.get("/states", getStates);
filterRouter.get("/districts", getmunicipality);
filterRouter.get("/years", getYears);
filterRouter.get("/categories", getCategory);
filterRouter.get("/participants", getParticipants);
filterRouter.get("/count", getFilterAccidentCount);

export default filterRouter;
