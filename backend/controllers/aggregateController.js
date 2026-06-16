import accidentModel from "../models/accidentModel";

export const getAggregates = async (req, res) => {
  try {
    const { level, year } = req.query;
    console.log("queries: ", req.query);

    const match = {};
    if (year) match.year = Number(year);

    const groupField =
      level === "state"
        ? "$region_id"
        : level === "district"
          ? "$region_id"
          : "$region_id";
    console.log("level: ", groupField);
    const result = await accidentModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupField,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No aggregates found" });
    }

    return res
      .status(200)
      .json({ message: "Accident aggregates fetched successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
