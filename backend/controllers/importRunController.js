import importRunModel from "../models/importRunModel.js";

export const getImportRuns = async (req, res) => {
  try {
    const importRuns = await importRunModel.find().sort({ importDate: -1 });
    if (!importRuns) {
      return res.status(200).json({ message: "No importRuns found" });
    }

    return res.status(200).json({
      message: "Import-runs fetched successfully",
      data: importRuns,
      meta: {
        provider: "Destatis / Geoportal NRW",
        source: "Unfallatlas, GENESIS & GV-ISys / AGS",
        license: "Data License Germany – Attribution 2.0 (DL-DE–BY-2.0)",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching import-runs" });
  }
};
