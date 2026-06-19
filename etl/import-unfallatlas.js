import axios from "axios";
import { importUnfallatlasFile } from "./lib/importUnfallatlasFile.js";

export const runUnfallatlasImport = async () => {
  const response = await axios.get(
    "https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/",
  );

  const { datasets } = response.data;

  for (const dataset of datasets) {
    const csvZip = dataset.files.find((f) => f.name.endsWith("_CSV.zip"));

    if (!csvZip) continue;

    await importUnfallatlasFile(dataset, csvZip);
  }

  console.log("All Unfallatlas imports finished");
};
