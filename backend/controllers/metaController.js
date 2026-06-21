import accidentModel from "../models/accidentModel.js";
import regionModel from "../models/regionModel.js";
import { STATE_SLUGS } from "../mapping/stateMapping.js";

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
      return res.status(200).json({ message: "No data found" });
    }

    return res.status(200).json({
      result: result[0].earliestYear,
      meta: {
        source: "Unfallatlas",
        license: "Data licence Germany Attribution 2.0",
      },
      explanation:
        "The dataset contains recorded traffic accidents in Germany starting from from the year 2021. There is no data available before this year",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching earliest year",
    });
  }
};

export const getMetaRegionAvailability = async (req, res) => {
  try {
    const { state } = req.params;

    const stateName = STATE_SLUGS[state];

    if (!state) {
      return res.status(200).json({
        message: "Unknown state",
      });
    }

    const regions = await regionModel
      .find({ state_name: stateName })
      .select("ags");

    const agsList = regions.map((r) => r.ags);

    const result = await accidentModel.aggregate([
      {
        $match: {
          ags: { $in: agsList },
        },
      },
      {
        $group: {
          _id: null,
          availableFrom: { $min: "$year" },
          availableTo: { $max: "$year" },
        },
      },
    ]);

    if (!result.length) {
      return res.status(200).json({
        message: "No data found",
      });
    }

    return res.status(200).json({
      result: result[0].availableFrom,
      explanation:
        "This is the region availability according to the stored dataset",
      meta: {
        source: "Unfallatlas",
        license: "Data licence Germany Attribution 2.0",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error fetching metadata",
    });
  }
};
