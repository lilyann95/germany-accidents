import regionModel from "../models/regionModel";

export const getRegions = async (req, res) => {
  try {
    const { level } = req.query;
    console.log("params: ", req.query);

    const filter = level ? { level } : {};

    const regions = await regionModel.find(filter);

    if (!regions) {
      return res.status(404).json({ message: "No regions found" });
    }

    return res
      .status(200)
      .json({ message: "Regions fetched successfully", regions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching regions" });
  }
};
