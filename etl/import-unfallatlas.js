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

export const runUnfallatlasImport = async (req, res) => {
  const start = Date.now();

  try {
    //download Zip
    const response = await axios({
      method: "GET",
      url: process.env.CSV_DOWNLOAD_URL,
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream("./downloads/unfallatlas.zip"));

    //Extract Zip
    const zip = new AdmZip("./downloads/unfallatlas.zip");

    zip.extractAllTo("./downloads/unfallatlas");

    //Parse CSV
    const rows = [];
    fs.createReadStream("unfallorte2024.csv")
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => {
        console.log(rows.length);
      });

    //Transform fields
    for (const row of rows) {
      // const region = await regionModel.findOne({
      //   ags: row.ULAND + row.UKREIS + row.UGEMEINDE,
      // });

      const region = await regionModel.findOne({
        ags: row.AGS,
      });

      const participants = Object.entries(participantMap)
        .filter(([field]) => row[field] === 1)
        .map(([, value]) => value);

      const accident = {
        accident_id: row.UIDENTSTLAE,
        year: row.UJAHR,
        month: row.UMONAT,
        hour: row.USTUNDE,
        weekday: weekdayMap[row.UWOCHENTAG],
        category: categoryMap[row.UKATEGORIE],
        type: typeMap[row.UART],
        light: lightMap[row.ULICHTVERH],
        participants: participants,
        lon: Number(row.XGCSWGS84),
        lat: Number(row.YGCSWGS84),
        region_id: region.region_id,
      };

      //store in mongodb
      const inserted = await accidentModel.insertMany(accident);
    }
    //write an ImportRun
    const importRun = await createImportRun({
      source: "Unfallatlas",
      importDate: new Date(),
      recordsImported: accidents.length,
      version: "2024",
      status: "success",
      durationMs: Date.now() - start,
    });

    console.log("Data stored successfully", importRun);
  } catch (err) {
    //write an ImportRun
    const importERun = await createImportRun({
      source: "Unfallatlas",
      importDate: new Date(),
      recordsImported: accidents.length,
      version: "2024",
      status: "failed",
      durationMs: Date.now() - start,
      error: err.message,
    });

    console.error("Import failed", err);
  }
};
