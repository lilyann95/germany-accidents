import mongoose from "mongoose";

const regionSchema = mongoose.Schema({
  region_id: { type: mongoose.Schema.Types.UUID, required: true, unique: true },
  parent_region_id: {
    type: mongoose.Schema.Types.UUID,
    ref: "region",
    default: null,
  },
  ags: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  population: { type: Number, min: 0 },
  geometry: { type: mongoose.Schema.Types.Mixed, default: null },
});

const regionModel =
  mongoose.models.region || mongoose.model("region", regionSchema);

export default regionModel;
