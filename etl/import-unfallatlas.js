import axios from "axios";
import { importUnfallatlasFile } from "./lib/importUnfallatlasFile.js";

export const runUnfallatlasImport = async () => {
  const response = await axios.get(
    "https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/",
  );

  const { datasets } = response.data;

  const selectedDatasets = datasets.filter((dataset) => {
    const year = Number(dataset.name.match(/\d{4}/)?.[0]);
    return year >= 2021;
  });

  for (const dataset of selectedDatasets) {
    const csvZip = dataset.files.find((f) => f.name.endsWith("_CSV.zip"));

    if (!csvZip) continue;

    await importUnfallatlasFile(dataset, csvZip);
  }

  console.log("All Unfallatlas imports finished");
};
