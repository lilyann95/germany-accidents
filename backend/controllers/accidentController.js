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
      return res.status(404).json({ message: "No accidents found" });
    }

    return res.status(200).json({
      result: accidents,
      explanation: `These are the accidents that occured in Germany`,
      meta: {
        source: "Unfallatlas",
        license: "Data licence Germany Attribution 2.0",
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
        return res.status(404).json({ message: "Region not found" });
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
        source: "Unfallatlas",
        license: "Data licence Germany Attribution 2.0",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching accidents" });
  }
};

export const getAccidentsStats = async (req, res) => {
  try {
    const {
      groupBy = "region",
      year,
      region_id,
      category,
      month,
      limit = 5,
      order = "desc",
    } = req.query;

    const match = {};

    if (year) match.year = Number(year);
    if (region_id) match.region_id = region_id;
    if (category) match.category = category;
    if (month) match.month = Number(month);

    let groupField;

    switch (groupBy) {
      case "year":
        groupField = "$year";
        break;

      case "month":
        groupField = "$month";
        break;

      case "category":
        groupField = "$category";
        break;

      case "district":
      case "region":
        groupField = "$region_id";
        break;

      default:
        groupField = "$region_id";
    }

    const result = await accidentModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupField,
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: order === "asc" ? 1 : -1,
        },
      },
      {
        $limit: Number(limit),
      },
    ]);

    return res.status(200).json({
      groupBy,
      result: result,
      explanation: `These are the accidents that occured in Germany`,
      meta: {
        totalGroups: result.length,
        limit: Number(limit),
        order,
        source: "Unfallatlas",
        license: "Data licence Germany Attribution 2.0",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching stats",
    });
  }
};
