import axios from "axios";
import fs from "fs";
import AdmZip from "adm-zip";
import csv from "csv-parser";
import accidentModel from "../backend/models/accidentModel.js";
import { createImportRun } from "./lib/createImportRun.js";
import regionModel from "../backend/models/regionModel.js";
import {
  participantMap,
  weekdayMap,
  typeMap,
  categoryMap,
  lightMap,
} from "./mapping/unfallatlas.js";

export const runUnfallatlasImport = async () => {
  const start = Date.now();
  let importedCount = 0;

  try {
    const stream = fs
      .createReadStream("./data/unfallorte2023_LinRef.csv")
      .pipe(csv({ separator: ";" }));

    //Transform fields
    const toNumber = (value) => {
      if (value == null || value === "") return null;

      const n = Number(String(value).replace(",", "."));
      return Number.isFinite(n) ? n : null;
    };

    let data = {};

    for await (const row of stream) {
      const region = await regionModel.findOne({
        ags:
          row.ULAND +
          row.UREGBEZ +
          row.UKREIS.padStart(2, "0") +
          row.UGEMEINDE.padStart(3, "0"),
      });

      if (!region) continue;

      const participants = Object.entries(participantMap)
        .filter(([field]) => Number(row[field]) === 1)
        .map(([, value]) => value);

      const lon = toNumber(row.XGCSWGS84);
      const lat = toNumber(row.YGCSWGS84);

      if (!lat || !lon) continue;

      data = await accidentModel.updateOne(
        { accident_id: row.UIDENTSTLAE },
        {
          $set: {
            year: Number(row.UJAHR),
            month: Number(row.UMONAT),
            hour: Number(row.USTUNDE),
            weekday: weekdayMap[row.UWOCHENTAG],
            category: categoryMap[row.UKATEGORIE],
            type: typeMap[row.UART],
            light: lightMap[row.ULICHTVERH],
            participants: participants,
            lat,
            lon,
            region_id: region.region_id,
          },
          $setOnInsert: {
            accident_id: row.UIDENTSTLAE,
          },
        },
        { upsert: true },
      );

      importedCount++;
    }
    //write an ImportRun
    const importRun = await createImportRun({
      source: "Unfallatlas",
      importDate: new Date(),
      recordsImported: importedCount,
      version: Number(row.UJAHR),
      status: "success",
      durationMs: Date.now() - start,
    });

    console.log("Data stored successfully", {
      importRun: importRun,
      data: data,
    });
  } catch (err) {
    //write an ImportRun
    console.error("Import failed", err.stack);
    const importERun = await createImportRun({
      source: "Unfallatlas",
      importDate: new Date(),
      recordsImported: importedCount,
      version: Number(row.UJAHR),
      status: "failed",
      durationMs: Date.now() - start,
      error: err.message,
    });
  }
};
