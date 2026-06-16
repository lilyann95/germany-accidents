import importRunModel from "../models/importRunModel";

export const getImportRuns = async (req, res) => {
  try {
    const importRuns = await importRunModel.find().sort({ importDate: -1 });
    if (!importRuns) {
      return res.status(404).json({ message: "No importRuns found" });
    }

    return res
      .status(200)
      .json({ message: "Import-runs fetched successfully", importRuns });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching import-runs" });
  }
};
