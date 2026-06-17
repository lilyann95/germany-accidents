import accidentModel from "../models/accidentModel.js";

export const getMeta = async (req, res) => {
  try {
    res.status(200).json([
      {
        name: "Unfallatlas",
        provider: "Destatis / Geoportal NRW",
        license: "Data licence Germany – Attribution 2.0",
        url: "https://unfallatlas.statistikportal.de/",
        usage: "accident points with attributes",
      },
      {
        name: "GENESIS Database",
        provider: "Destatis",
        license:
          "Data licence Germany – Attribution 2.0 (check dataset-specific terms)",
        url: "https://www-genesis.destatis.de/datenbank/online/",
        usage: "population, vehicles, regional stats",
      },
      {
        name: "GV-ISys / AGS",
        provider: "Destatis",
        license: "Public sector administrative data (Germany)",
        url: "https://www.destatis.de/",
        usage: "regional identifiers",
      },
    ]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching metadata" });
  }
};

export const getMetaEarliestYear = async (req, res) => {
  try {
    const result = await accidentModel.aggregate([
      {
        $group: {
          _id: null,
          earliestYear: { $min: "$year" },
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json({
      earliestYear: result[0].earliestYear,
      meta: [
        {
          source: "Unfallatlas",
          license: "Data licence Germany Attribution 2.0",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching earliest year",
    });
  }
};

export const getMetaRegionAvailability = async (req, res) => {
  try {
    const { state_name } = req.query;

    const match = {};
    if (state_name) match.state_name = state_name;

    const result = await accidentModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          availableFrom: { $min: "$year" },
          availableTo: { $max: "$year" },
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json({
      data: {
        region: state_name || "ALL",
        availableFrom: result[0].availableFrom,
        availableTo: result[0].availableTo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching metadata",
    });
  }
};
