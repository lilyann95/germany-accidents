import { runAgsImport } from "./import-ags.js";
import { runGenesisImport } from "./import-genesis.js";
import { runUnfallatlasImport } from "./import-unfallatlas.js";
import { populationParser } from "./lib/populationParser.js";
import { carsParser } from "./lib/carParser.js";
import connectMongoDB from "../backend/config/mongodb.js";

const runImportAll = async () => {
  await connectMongoDB();
  await runAgsImport();
  await runGenesisImport({
    filepath: "./data/12411-0015_en.xlsx",
    parser: populationParser,
  });
  await runGenesisImport({
    filepath: "./data/46251-0021_en.xlsx",
    parser: carsParser,
  });
  await runUnfallatlasImport();
  console.log("Import finished");
};

runImportAll();
