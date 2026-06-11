import mongoose from "mongoose";

const indicatorValueSchema = mongoose.Schema({
  region_id: {
    type: mongoose.Schema.Types.UUID,
    ref: "region",
    required: true,
  },
  indicator_id: {
    type: mongoose.Schema.Types.UUID,
    ref: "indicator",
    required: true,
  },
  year: { type: Number, required: true },
  value: { type: Number, required: true },
});

const indicatorValueModel =
  mongoose.models.indicatorValue ||
  mongoose.model("indicatorValue", indicatorValueSchema);

export default indicatorValueModel;
