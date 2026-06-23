import accidentModel from "../models/accidentModel.js";
import regionModel from "../models/regionModel.js";

export const getAccidents = async (req, res) => {
  try {
    const {
      year,
      month,
      hour,
      weekday,
      category,
      light,
      participant,
      region_id,
      region_name,
    } = req.query;

    const filter = {};

    if (year) filter.year = Number(year);
    if (month) filter.month = Number(month);
    if (hour) filter.hour = Number(hour);
    if (category) filter.category = category;
    if (region_id) filter.region_id = region_id;
    if (weekday) filter.weekday = weekday;
    if (light) filter.light = light;
    if (region_name) filter.region_name = name;
    if (participant) filter.participants = participant;

    const accidents = await accidentModel.find(filter);

    if (accidents.length === 0) {
      return res.status(200).json({ message: "No accidents found" });
    }

    return res.status(200).json({
      result: accidents,
      explanation: `These are the accidents that occured in Germany`,
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

export const getAccidentsCount = async (req, res) => {
  try {
    const {
      year,
      month,
      hour,
      weekday,
      category,
      light,
      participants,
      region_id,
      state_name,
    } = req.query;

    const filter = {};

    if (state_name) {
      const regions = await regionModel.find({ state_name }).select("ags");

      const agsList = regions.map((r) => r.ags).filter(Boolean);

      if (!agsList.length) {
        return res.status(200).json({ result: 0 });
      }

      filter.ags = { $in: agsList };
    } else if (region_id) {
      const region = await regionModel.findOne({ region_id }).select("ags");

      if (!region?.ags) {
        return res.status(200).json({ message: "Region not found" });
      }

      filter.ags = region.ags;
    }

    if (year) filter.year = Number(year);
    if (month) filter.month = Number(month);
    if (hour) filter.hour = Number(hour);
    if (category) filter.category = category;
    if (weekday) filter.weekday = weekday;
    if (light) filter.light = light;

    if (participants) {
      const list = participants.split(",").map((p) => p.trim());
      filter.participants = { $in: list };
    }

    const count = await accidentModel.countDocuments(filter);

    const details = [];

    if (participants) details.push(`involving ${participants}`);
    if (category) details.push(category);
    if (state_name) details.push(`in ${state_name}`);
    if (year) details.push(`in ${year}`);

    const explanation =
      `There ${count === 1 ? "was" : "were"} ${count} accident${count === 1 ? "" : "s"} ` +
      details.join(" ") +
      ".";

    return res.status(200).json({
      result: count,
      explanation: explanation,
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

export const getAccidentRankingStats = async (req, res) => {
  try {
    const result = await accidentModel.aggregate([
      {
        $match: {
          year: 2024,
          category: "Fatal Accident",
        },
      },
      {
        $addFields: {
          districtAgs: { $substrBytes: ["$ags", 0, 5] },
        },
      },
      {
        $group: {
          _id: "$districtAgs",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "regions",
          localField: "_id",
          foreignField: "ags",
          as: "region",
        },
      },
      {
        $unwind: "$region",
      },
      {
        $match: {
          "region.level": "district",
        },
      },
      {
        $project: {
          _id: 0,
          name: "$region.name",
          data: "$count",
        },
      },
      {
        $sort: {
          data: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    if (!result.length) {
      return res.status(200).json({
        message: "No data found",
      });
    }

    return res.status(200).json({
      result: result,
      explanation: `These are the top 5 districts with the highest number of fatal accidents that occured in 2024 in Germany`,
      meta: {
        provider: "Destatis / Geoportal NRW",
        source: "Unfallatlas, GENESIS & GV-ISys / AGS",
        license: "Data License Germany – Attribution 2.0 (DL-DE–BY-2.0)",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching accident rankings",
    });
  }
};

export const getBicycleAccidentCount = async (req, res) => {
  try {
    const { municipality, year, participant } = req.query;

    const regionAgs = await regionModel
      .find({ name: municipality })
      .select("ags");

    const agsList = regionAgs.map((m) => m.ags);

    if (!regionAgs) {
      return res.status(200).json({
        message: `${municipality} not found`,
      });
    }

    const result = await accidentModel.aggregate([
      {
        $match: {
          year: Number(year),
          ags: { $in: agsList },
          participants: { $in: [participant] },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    const count = result.length ? result[0].count : 0;

    return res.status(200).json({
      result: count,
      explanation: `There were ${count} ${participant} accidents in ${municipality} during ${year}`,
      meta: {
        provider: "Destatis / Geoportal NRW",
        source: "Unfallatlas, GENESIS & GV-ISys / AGS",
        license: "Data License Germany – Attribution 2.0 (DL-DE–BY-2.0)",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching accident rankings",
    });
  }
};

export const getMunicipalityAccidents = async (req, res) => {
  try {
    const { state_name, year } = req.query;

    if (!state_name) {
      return res.status(200).json({
        message: "Unknown state",
      });
    }

    const municipalities = await regionModel
      .find({
        state_name,
        level: "municipality",
      })
      .select("ags name");

    const agsList = municipalities.map((m) => m.ags);

    const accidentData = await accidentModel.aggregate([
      {
        $match: {
          ags: { $in: agsList },
          year: Number(year),
        },
      },
      {
        $group: {
          _id: "$ags",
          accidentCount: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map(
      accidentData.map((item) => [item._id, item.accidentCount]),
    );

    const result = municipalities
      .filter((m) => !countMap.has(m.ags))
      .map((m) => ({
        name: m.name,
        ags: m.ags,
        data: 0,
      }));

    return res.status(200).json({
      result,
      explanation: `Municipalities in ${state_name} with zero reported accidents in ${year}`,
      meta: {
        count: result.length,
        provider: "Destatis / Geoportal NRW",
        source: "Unfallatlas, GENESIS & GV-ISys / AGS",
        license: "Data License Germany – Attribution 2.0 (DL-DE–BY-2.0)",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching municipalities",
    });
  }
};
