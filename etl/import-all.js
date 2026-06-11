import { runAgsImport } from "./import-ags.js";
import { runIndicatorImport } from "./import-indicators.js";
import { runGenesisImport } from "./import-genesis.js";
import { runUnfallatlasImport } from "./import-unfallatlas.js";
import connectMongoDB from "../backend/config/mongodb.js";

await connectMongoDB();
await runAgsImport();

console.log("Import finished");
// console.log(
//   "MONGODB_URI_STRING",
//   process.cwd(),
//   process.env.MONGODB_URI_STRING,
// );
//runIndicatorImport();
//runGenesisImport();
//runUnfallatlasImport();
