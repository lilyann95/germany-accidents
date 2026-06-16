import accidentModel from "../models/accidentModel";

export const getAccidents = async (req, res) => {
  try {
    // const {year, month, hour, weekday, category, light, participants} = req.query;
    const {
      year,
      month,
      hour,
      weekday,
      category,
      light,
      participant,
      region_id,
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
    if (participant) filter.participants = participant;

    const accidents = await accidentModel.find(filter);

    if (accidents.length === 0) {
      return res.status(404).json({ message: "No accidents found" });
    }

    return res
      .status(200)
      .json({ message: "Accidents fetched successfully", accidents });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching accidents" });
  }
};
