import indicatorValueModel from "../backend/models/indicatorValueModel.js";
import regionModel from "../backend/models/regionModel.js";
import indicatorModel from "../backend/models/indicatorModel.js";

export const runGenesisImport = async () => {
  const start = Date.now();

  try {
    //download Zip
    const response = await axios({
      method: "GET",
      url: process.env.CSV_DOWNLOAD_GENESIS_URL,
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream("./downloads/genesis.zip"));

    //Extract Zip
    const zip = new AdmZip("./downloads/genesis.zip");

    zip.extractAllTo("./downloads/genesis");

    //Parse CSV
    const rows = [];
    fs.createReadStream("genesis.csv") //double check later
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => {
        console.log(rows.length);
      });

    for (const row of rows) {
      //Transform fields
      const region = await regionModel.findOne({ ags: row.AGS });
      const indicator = await indicatorModel.findOne({ code: row.code });

      const indicatorValue = {
        region_id: region.region._id,
        indicator_id: indicator.indicator_id,
        year: Number(row.year),
        value: Number(row.value),
      };

      //store in mongodb
      const inserted = await indicatorValueModel.create(indicatorValue);
    }
    console.log("Data collected successfully");
  } catch (err) {
    console.error("Import failed", err);
  }
};
