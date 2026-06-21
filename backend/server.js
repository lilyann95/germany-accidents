import express from "express";
import cors from "cors";
import "dotenv/config";
import connectMongoDB from "./config/mongodb.js";
import accidentRouter from "./routes/accidentRoute.js";
import importRunsRouter from "./routes/importRunRoute.js";
import metadataRouter from "./routes/metaRoute.js";
import analysisRouter from "./routes/AnalysisRoute.js";
import filterRouter from "./routes/filterRoute.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;
connectMongoDB();

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/accidents", accidentRouter);
app.use("/api/filters", filterRouter);
app.use("/api/meta", metadataRouter);
app.use("/api/analysis", analysisRouter);
app.use("/api/import-runs", importRunsRouter);

//app start server
app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
