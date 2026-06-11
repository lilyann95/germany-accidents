import importRunModel from "../../backend/models/importRunModel.js";

export async function createImportRun({
  source,
  importDate,
  recordsImported = 0,
  version,
  status,
  durationMs,
  error,
}) {
  return importRunModel.create({
    source,
    importDate,
    recordsImported,
    version,
    status,
    durationMs,
    error,
  });
}
