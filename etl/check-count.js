import accidentModel from "../backend/models/accidentModel.js";
import regionModel from "../backend/models/regionModel.js";

export const checkCount = async () => {
  // await regionModel.deleteMany({});
  // await accidentModel.deleteMany({});

  const res = await regionModel.countDocuments();
  console.log("fertig", res);
};
