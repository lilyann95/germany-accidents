import indicatorModel from "../backend/models/indicatorModel.js";

export const runIndicatorImport = async () => {
  try {
    // inserted = await regionModel.updateOne(
    //         { ags: String(row[6]) },
    //         {
    //           $set: {
    //             name: row[7],
    //             level: getLevel(row[4]),
    //             population: Number(row[14]) || null,
    //             geometry: {},
    //           },
    //         },
    //         {
    //           $setOnInsert: {
    //             region_id: uuid(),
    //             parent_region_id: null,
    //             ags: String(row[6]),
    //           },
    //         },
    //         { upsert: true },
    //       );
    const indicators = [
      {
        indicator_id: uuid(),
        code: "POP_TOTAL",
        name: "Population",
        unit: "persons",
        source_system: "GENESIS",
      },
      {
        indicator_id: uuid(),
        code: "EMP_TOTAL",
        name: "Employment",
        unit: "persons",
        source_system: "GENESIS",
      },
    ];

    //store in mongodb
    const inserted = await indicatorModel.insertMany(indicators);
    console.log("Data stored successfully");
  } catch (err) {
    console.error("Import failed", err);
  }
};
