import axios from "axios";
import xlsx from "xlsx";
import { v4 as uuid } from "uuid";
import regionModel from "../backend/models/regionModel.js";
import { createImportRun } from "./lib/createImportRun.js";
import { getLevel } from "./mapping/unfallatlas.js";

export const runAgsImport = async () => {
  try {
    //Extract files
    const file = xlsx.readFile("./data/anschriftenverzeichnis-5119101.xlsx");
    const sheet = file.Sheets["Anschriften_31_01_2026"];
    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
    });

    //Transform fields
    let inserted = {};
    for (const row of rows) {
      //rows with municipality AGS
      if (!row[6] || String(row[6]).length !== 8) {
        continue;
      }

      // const region = {
      //   region_id: uuid(),
      //   parent_region_id: null,
      //   ags: String(row[6]),
      //   name: row[7],
      //   level: getLevel(row[4]),
      //   geometry: null,
      //   population: Number(row[14]) || null,
      // };
      // console.log("RAW ROW: ", row);
      // console.log("AGS VALUE: ", row[6]);

      //store in mongodb
      inserted = await regionModel.updateOne(
        { ags: String(row[6]).trim() },
        {
          $set: {
            name: row[7],
            level: getLevel(row[4]),
            population: Number(row[14]) || null,
            geometry: {},
          },
          $setOnInsert: {
            region_id: uuid(),
            parent_region_id: null,
            ags: String(row[6]).trim(),
          },
        },
        { upsert: true },
      );
    }
    console.log("Data collected successfully", inserted);
  } catch (err) {
    console.error("Import failed", err);
  }
};
