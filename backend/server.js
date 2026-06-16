import express from "express";
import cors from "cors";
import "dotenv/config";
import connectMongoDB from "./config/mongodb.js";

import accidentRouter from "./routes/accidentRoute.js";
import aggregateRouter from "./routes/aggregateRoute.js";
import importRunsRouter from "./routes/importRunRoute.js";
import metadataRouter from "./routes/metadataRoute.js";
import regionRouter from "./routes/regionRoute.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;
connectMongoDB();

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/regions", regionRouter);
app.use("accidents", accidentRouter);
app.use("/aggregates", aggregateRouter);
app.use("/metadata", metadataRouter);
app.use("/import-runs", importRunsRouter);

//app start server
app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
