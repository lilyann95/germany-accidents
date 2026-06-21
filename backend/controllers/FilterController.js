import regionModel from "../models/regionModel.js";
import accidentModel from "../models/accidentModel.js";

export const getStates = async (req, res) => {
  try {
    const states = await regionModel.distinct("state_name");
    if (states.length === 0) {
      return res.status(200).json({ message: "No states found" });
    }

    res.status(200).json({
      result: states.sort(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching states",
    });
  }
};

export const getmunicipality = async (req, res) => {
  try {
    const { state } = req.query;

    const municipality = await regionModel
      .find({
        state_name: state,
        level: "municipality",
      })
      .select("name");

    if (municipality.length === 0) {
      return res.status(200).json({ message: "No municipality found" });
    }

    const list = municipalities
      .map((m) => m.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return res.status(200).json({
      result: list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching municipality",
    });
  }
};

export const getYears = async (req, res) => {
  try {
    const years = await accidentModel.distinct("year");

    if (years.length === 0) {
      return res.status(200).json({ message: "No years found" });
    }

    res.status(200).json({
      result: years.sort(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching years",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await accidentModel.distinct("category");

    if (category.length === 0) {
      return res.status(200).json({ message: "No categories found" });
    }
    res.status(200).json({
      result: category.sort(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching categories",
    });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const participants = await accidentModel.distinct("participants");

    if (participants.length === 0) {
      return res.status(200).json({ message: "No participants found" });
    }
    res.status(200).json({
      result: participants.sort(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching participants",
    });
  }
};

export const getFilterAccidentCount = async (req, res) => {
  try {
    const {
      state,
      municipality,
      year,
      month,
      hour,
      category,
      light,
      participants,
    } = req.query;

    const filter = {};

    if (state) {
      const regions = await regionModel
        .find({ state_name: state })
        .select("ags");

      const agsList = regions.map((r) => r.ags);

      filter.ags = { $in: agsList };
    }

    // if (municipality) {
    //   const regions = await regionModel
    //     .find({ name: municipality })
    //     .select("ags");

    //   const agsList = regions.map((r) => r.ags);

    //   filter.ags = { $in: agsList };
    // }

    if (year) filter.year = Number(year);
    if (month) filter.month = Number(month);
    if (hour) filter.hour = Number(hour);

    if (category) filter.category = category;
    if (light) filter.light = light;

    if (participants) {
      const list = participants.split(",").map((p) => p.trim());
      filter.participants = { $in: list };
    }

    const count = await accidentModel.countDocuments(filter);

    return res.status(200).json({
      result: count,
      explanation: `There are ${count} accidents for selected filters`,
      meta: {
        source: "Unfallatlas",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching accident count",
    });
  }
};
