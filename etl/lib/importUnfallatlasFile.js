import axios from "axios";
import fs from "fs";
import AdmZip from "adm-zip";
import csv from "csv-parser";
import accidentModel from "../../backend/models/accidentModel.js";
import { createImportRun } from "./createImportRun.js";
import regionModel from "../../backend/models/regionModel.js";
import {
  participantMap,
  weekdayMap,
  typeMap,
  categoryMap,
  lightMap,
  toNumber,
} from "../mapping/unfallatlas.js";
import console from "console";

export const importUnfallatlasFile = async (dataset, csvZip) => {
  const start = Date.now();
  let importedCount = 0;

  try {
    const baseUrl =
      "https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/";

    const downloadUrl = baseUrl + csvZip.name;

    // Download ZIP
    const response = await axios({
      method: "GET",
      url: downloadUrl,
      responseType: "stream",
    });

    const zipPath = `./downloads/${csvZip.name}`;

    const writer = fs.createWriteStream(zipPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // console.log("dataset", dataset);
    // Extract ZIP
    const extractDir = `./downloads/${dataset.name}`;

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractDir, true);

    // Find CSV
    // const csvDir = `${extractDir}/csv`;

    // const extractedFiles = fs.readdirSync(csvDir);

    const findFiles = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      let files = [];

      for (const entry of entries) {
        const fullPath = `${dir}/${entry.name}`;

        if (entry.isDirectory()) {
          files.push(...findFiles(fullPath));
        } else {
          files.push(fullPath);
        }
      }

      return files;
    };

    const allFiles = findFiles(extractDir);

    const csvPath =
      allFiles.find((f) => f.toLowerCase().endsWith(".csv")) ||
      allFiles.find((f) => f.toLowerCase().endsWith(".txt"));

    if (!csvPath) {
      console.log("Files found:", allFiles);
      throw new Error(`No CSV found for ${dataset.name}`);
    }

    console.log("Using file:", csvPath);

    const stream = fs.createReadStream(csvPath).pipe(csv({ separator: ";" }));

    const regions = await regionModel.find();

    const regionMap = new Map(regions.map((r) => [r.ags, r]));
    const operations = [];

    for await (const row of stream) {
      const ags =
        row.ULAND +
        row.UREGBEZ +
        row.UKREIS.padStart(2, "0") +
        row.UGEMEINDE.padStart(3, "0");

      const region = regionMap.get(ags);

      if (!region) continue;

      const lon = toNumber(row.XGCSWGS84);
      const lat = toNumber(row.YGCSWGS84);

      if (lat == null || lon == null) continue;

      const participants = Object.entries(participantMap)
        .filter(([field]) => Number(row[field]) === 1)
        .map(([, value]) => value);
      //   console.log("Hello11");

      //   await accidentModel.updateOne(
      //     { accident_id: row.UIDENTSTLAE },
      //     {
      //       $set: {
      //         year: Number(row.UJAHR),
      //         month: Number(row.UMONAT),
      //         hour: Number(row.USTUNDE),
      //         weekday: weekdayMap[row.UWOCHENTAG],
      //         category: categoryMap[row.UKATEGORIE],
      //         type: typeMap[row.UART],
      //         light: lightMap[row.ULICHTVERH],
      //         participants,
      //         lat,
      //         lon,
      //         region_id: region.region_id,
      //       },
      //       $setOnInsert: {
      //         accident_id: row.UIDENTSTLAE,
      //       },
      //     },
      //     { upsert: true },
      //   );

      operations.push({
        updateOne: {
          filter: { accident_id: row.UIDENTSTLAE },
          update: {
            $set: {
              year: Number(row.UJAHR),
              month: Number(row.UMONAT),
              hour: Number(row.USTUNDE),
              weekday: weekdayMap[row.UWOCHENTAG],
              category: categoryMap[row.UKATEGORIE],
              type: typeMap[row.UART],
              light: lightMap[row.ULICHTVERH],
              participants,
              lat,
              lon,
              region_id: region.region_id,
            },
            $setOnInsert: {
              accident_id: row.UIDENTSTLAE,
            },
          },
          upsert: true,
        },
      });

      if (operations.length === 1000) {
        await accidentModel.bulkWrite(operations);
        operations.length = 0;
      }

      if (importedCount % 10000 === 0) {
        console.log(`${dataset.name}: ${importedCount} rows processed`);
      }

      importedCount++;
    }

    if (operations.length > 0) {
      await accidentModel.bulkWrite(operations);
    }

    const year = dataset.name.match(/\d{4}/)?.[0];

    await createImportRun({
      source: "Unfallatlas",
      importDate: new Date(),
      recordsImported: importedCount,
      version: year,
      status: "success",
      durationMs: Date.now() - start,
    });

    console.log(`${year}: ${importedCount} accidents imported`);
  } catch (err) {
    console.log("Hello");
    const year = dataset.name.match(/\d{4}/)?.[0];

    await createImportRun({
      source: "Unfallatlas",
      importDate: new Date(),
      recordsImported: importedCount,
      version: year,
      status: "failed",
      durationMs: Date.now() - start,
      error: err.message,
    });

    console.error(`Import failed for ${dataset.name}`, err);
  }
};
