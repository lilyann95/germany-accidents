import axios from "axios";
import xlsx from "xlsx";
import { v4 as uuid } from "uuid";
import indicatorValueModel from "../backend/models/indicatorValueModel.js";
import regionModel from "../backend/models/regionModel.js";
import indicatorModel from "../backend/models/indicatorModel.js";

export const runGenesisImport = async ({ filepath, parser }) => {
  try {
    //Extract files
    const file = xlsx.readFile(filepath);
    const sheet = file.Sheets[file.SheetNames[0]];

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
    });

    const indicatorCode = file.SheetNames[0];
    const result = parser(rows, indicatorCode);
    // console.log("ROWS:", rows.length);
    // console.log("HEADER ROW:", rows[4]);
    // console.log("SAMPLE ROW:", rows[5]);

    const indicator = await indicatorModel.findOneAndUpdate(
      { code: result.indicator.code },
      {
        $set: {
          name: result.indicator.name,
          unit: result.indicator.unit,
          source_system: result.indicator.source_system,
        },
        $setOnInsert: {
          indicator_id: uuid(),
          code: result.indicator.code,
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    let inserted = {};
    for (const value of result.values) {
      const region = await regionModel.findOne({
        ags: value.regionKey,
      });

      if (!region) continue;

      inserted = await indicatorValueModel.updateOne(
        {
          indicator_id: indicator.indicator_id,
          region_id: region.region_id,
          year: value.year || null,
        },
        {
          $set: {
            indicator_id: indicator.indicator_id,
            region_id: region.region_id,
            year: value.year || null,
            value: value.value,
          },
        },
        { upsert: true },
      );
    }

    // const indicatorCode = file.SheetNames[0];

    // const titleRow = rows[0][0];
    // const unitRow = rows[2][0];

    // const name = titleRow.split(":")[0].trim();

    // const unitMatch = unitRow.match(/\((.*)\)/);
    // const unit = unitMatch ? unitMatch[1] : "unknown";

    // //Store the indicator
    // await indicatorModel.updateOne(
    //   { code: indicatorCode },
    //   {
    //     $set: {
    //       name,
    //       unit,
    //       source_system: "GENESIS",
    //     },
    //     $setOnInsert: {
    //       indicator_id: uuid(),
    //       code: indicatorCode,
    //     },
    //   },
    //   { upsert: true },
    // );

    // //Indicator values
    // const indicator = await indicatorModel.findOne({ code: indicatorCode });

    // const headerRow = rows[4];

    // const yearColumns = headerRow
    //   .map((cell, i) => {
    //     if (typeof cell === "string" && cell.includes("202")) {
    //       return {
    //         year: Number(cell.slice(0, 4)),
    //         index: i,
    //       };
    //     }
    //     return null;
    //   })
    //   .filter(Boolean);

    // let inserted = {};
    // const dataRows = rows.slice(5);
    // for (const row of dataRows) {
    //   console.log("RAW AGS:", row[0]);
    //   const ags = row[0];

    //   const region = await regionModel.findOne({ ags });

    //   if (!region) continue;

    //   for (const col of yearColumns) {
    //     const value = row[col.index];

    //     if (typeof value !== "number") continue;

    //     inserted = await indicatorValueModel.updateOne(
    //       {
    //         region_id: region.region_id,
    //         indicator_id: indicator.indicator_id,
    //         year: col.year,
    //       },
    //       {
    //         $set: {
    //           value,
    //         },
    //       },
    //       { upsert: true },
    //     );
    //   }
    // }

    console.log("Data collected successfully", {
      indicator: indicator,
      indicatorValues: inserted,
    });
  } catch (err) {
    console.error("Import failed", err);
  }
};
