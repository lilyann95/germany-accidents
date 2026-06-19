export const participantMap = {
  IstRad: "cyclist",
  IstPKW: "car",
  IstFuss: "pedestrian",
  IstKrad: "motorcycle",
  IstGkfz: "heavyVehicle",
  IstSonstige: "other",
};

export const weekdayMap = {
  1: "Sunday",
  2: "Monday",
  3: "Tuesday",
  4: "Wednesday",
  5: "Thursday",
  6: "Friday",
  7: "Saturday",
};

export const categoryMap = {
  1: "Fatal Accident",
  2: "Serious Injury Accident",
  3: "Minor Injury Accident",
};

export const lightMap = {
  0: "Unknown",
  1: "Daylight",
  2: "Twilight",
  3: "Darkness",
};

export const typeMap = {
  0: "Other Accident",
  1: "Collision with Starting, Stopping or Stationary Vehicle",
  2: "Collision with Vehicle Ahead or Waiting",
  3: "Collision with Vehicle Moving Laterally in Same Direction",
  4: "Collision with Oncoming Vehicle",
  5: "Collision with Turning or Crossing Vehicle",
  6: "Collision Between Vehicle and Pedestrian",
  7: "Collision with Roadway Obstacle",
  8: "Leaving Carriageway to the Right",
  9: "Leaving Carriageway to the Left",
};

export const getLevel = (type) => {
  switch (type) {
    case "Kreisfreie Stadt":
    case "Stadt":
    case "Kreisangehörige Gemeinde":
      return "municipality";
    case "Kreis":
      return "district";
    case "Amt":
      return "office";
    default:
      return "other";
  }
};

export const toNumber = (value) => {
  if (value == null || value === "") return null;

  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : null;
};
