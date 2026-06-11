import mongoose from "mongoose";

const importRunSchema = mongoose.Schema({
  source: { type: String, required: true },
  importDate: { type: Date, default: Date.now },
  recordsImported: { type: Number, required: true },
  version: { type: String, required: true },
  status: { type: String, enum: ["success", "failed"], required: true },
  durationMs: { type: String, required: true },
  error: { type: String },
});

const importRunModel =
  mongoose.models.importRun || mongoose.model("importRun", importRunSchema);

export default importRunModel;
