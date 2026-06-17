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
    console.log("queries: ", req.query);

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
      message: "Accidents fetched successfully",
      data: accidents,
      meta: meta,
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
      participant,
      region_id,
      state_name,
    } = req.query;

    const filter = {};

    if (state_name) {
      const regions = await regionModel
        .find({ state_name })
        .select("region_id");

      if (regions.length === 0) {
        return res.status(404).json({
          message: `State '${state_name}' not found`,
        });
      }

      filter.region_id = {
        $in: regions.map((r) => r.region_id),
      };
    }

    if (year) filter.year = Number(year);
    if (month) filter.month = Number(month);
    if (hour) filter.hour = Number(hour);
    if (category) filter.category = category;
    if (region_id) filter.region_id = region_id;
    if (weekday) filter.weekday = weekday;
    if (light) filter.light = light;
    if (participant) filter.participants = participant;

    const count = await accidentModel.countDocuments(filter);

    return res.status(200).json({
      message: "Accidents fetched successfully",
      data: count,
      licenses: [
        {
          source: "Unfallatlas",
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
      message: "Accident stats fetched successfully",
      groupBy,
      data: result,
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
