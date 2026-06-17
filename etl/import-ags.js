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
      const ags = row[6]
        ? String(row[6]).trim()
        : row[5]
          ? String(row[5]).trim()
          : null;
      if (!ags) continue;

      //store in mongodb
      inserted = await regionModel.updateOne(
        { ags },
        {
          $set: {
            name: row[7],
            state_name: row[1],
            level: getLevel(row[4]),
            population: Number(row[14]) || null,
            geometry: {},
          },
          $setOnInsert: {
            region_id: uuid(),
            parent_region_id: null,
            ags: ags,
          },
        },
        { upsert: true },
      );
    }

    console.log("Data collected successfully", {
      inserted,
    });
  } catch (err) {
    console.error("Import failed", err);
  }
};
