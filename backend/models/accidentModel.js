import mongoose from "mongoose";

const accidentSchema = mongoose.Schema({
  accident_id: {
    type: String,
    required: true,
    unique: true,
  },
  region_id: {
    type: mongoose.Schema.Types.UUID,
    ref: "region",
    required: true,
  },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  hour: { type: Number, required: true },
  weekday: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  light: { type: String },
  participants: { type: [String], required: true },
  lon: { type: Number, required: true },
  lat: { type: Number, required: true },
});

const accidentModel =
  mongoose.models.accident || mongoose.model("accident", accidentSchema);

export default accidentModel;
