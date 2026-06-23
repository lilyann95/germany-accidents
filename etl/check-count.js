import accidentModel from "../backend/models/accidentModel.js";
import regionModel from "../backend/models/regionModel.js";

export const checkCount = async () => {
  // await regionModel.deleteMany({});
  // await accidentModel.deleteMany({});

  const duplicates = await regionModel.aggregate([
    {
      $group: {
        _id: {
          name: "$name",
          state_name: "$state_name",
        },
        count: { $sum: 1 },
        ags: { $push: "$ags" },
      },
    },
    {
      $match: {
        count: { $gt: 1 },
      },
    },
  ]);

  console.log(duplicates.length);
  console.log(duplicates.slice(0, 10));
};
