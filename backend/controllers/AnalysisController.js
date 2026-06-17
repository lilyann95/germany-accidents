import accidentModel from "../models/accidentModel.js";
import indicatorModel from "../models/indicatorModel.js";
import indicatorValueModel from "../models/indicatorValueModel.js";
import regionModel from "../models/regionModel.js";

export const getAnalysisTrafficRisk = async (req, res) => {
  try {
    const { state_name, year } = req.query;

    const regions = await regionModel.find({
      state_name,
    });

    const regionIds = regions.map((r) => r.region_id);

    const carIndicator = await indicatorModel.findOne({
      code: "46251-0021",
    });

    const carStats = await indicatorValueModel.aggregate([
      {
        $match: {
          indicator_id: carIndicator.indicator_id,
          region_id: { $in: regionIds },
        },
      },
      {
        $group: {
          _id: null,
          totalCars: { $sum: "$value" },
        },
      },
    ]);

    const accidentCount = await accidentModel.countDocuments({
      region_id: { $in: regionIds },
      year: Number(year),
    });

    const totalCars = carStats[0]?.totalCars || 0;

    const result = totalCars > 0 ? (accidentCount / totalCars) * 100000 : 0;

    return res.status(200).json({
      state_name,
      year,
      accidents: accidentCount,
      passengerCars: totalCars,
      accidentsPer100kCars: Number(result.toFixed(2)),

      explanation: `Computed by dividing the number of recorded accidents in ${state_name} during ${year} by the number of registered passenger cars from GENESIS statistics and multiplying by 100,000.`,

      licenses: [
        {
          source: "Unfallatlas",
          license: "Data licence Germany Attribution 2.0",
        },
        {
          source: "GENESIS",
          license: "Data licence Germany Attribution 2.0",
        },
      ],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching accidents" });
  }
};
