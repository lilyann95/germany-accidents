import accidentModel from "../models/accidentModel.js";
import indicatorModel from "../models/indicatorModel.js";
import indicatorValueModel from "../models/indicatorValueModel.js";
import regionModel from "../models/regionModel.js";

export const getAnalysisTrafficRisk = async (req, res) => {
  try {
    const { year } = req.query;

    const carIndicator = await indicatorModel.findOne({
      code: "46251-0021",
    });

    const carStats = await indicatorValueModel.aggregate([
      {
        $match: {
          indicator_id: carIndicator.indicator_id,
        },
      },
      {
        $group: {
          _id: null,
          totalCars: { $sum: "$value" },
        },
      },
    ]);

    const totalCars = carStats[0]?.totalCars || 0;

    const accidentStats = await accidentModel.aggregate([
      {
        $match: {
          participants: "car",
        },
      },
      {
        $group: {
          _id: "$year",
          accidentCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const result =
      totalCars > 0
        ? accidentStats.map((item) => ({
            name: item._id,
            accidents: item.accidentCount,
            data: Number(
              ((item.accidentCount / totalCars) * 100000).toFixed(2),
            ),
          }))
        : 0;

    return res.status(200).json({
      result: result,
      explanation: `Computed by dividing the number of recorded accidents in per year by the number of registered passenger cars from GENESIS statistics and multiplying by 100,000.`,

      meta: {
        provider: "Destatis / Geoportal NRW",
        source: "Unfallatlas, GENESIS & GV-ISys / AGS",
        license: "Data License Germany – Attribution 2.0 (DL-DE–BY-2.0)",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching accidents" });
  }
};
