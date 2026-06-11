import mongoose from "mongoose";

const indicatorSchema = mongoose.Schema({
  indicator_id: {
    type: mongoose.Schema.Types.UUID,
    required: true,
    unique: true,
  },
  code: { type: String, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  source_system: { type: String, required: true },
});

const indicatorModel =
  mongoose.models.indicator || mongoose.model("indicator", indicatorSchema);

export default indicatorModel;
