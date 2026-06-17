import mongoose from "mongoose";

const registrySchema = mongoose.Schema({
  provider: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  license: { type: String, required: true },
  url: { type: String, required: true },
  usage: { type: String, required: true },
});

const regionModel =
  mongoose.models.registry || mongoose.model("registry", registrySchema);

export default registrySchema;
