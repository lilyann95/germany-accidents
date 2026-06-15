export function populationParser(rows, indicatorCode) {
  // metadata from file content
  const titleRow = rows[0]?.[0] || "";
  const unitRow = rows[2]?.[0] || "";

  const name = titleRow.split(":")[0].trim();

  const unitMatch = unitRow.match(/\((.*)\)/);
  const unit = unitMatch ? unitMatch[1] : "unknown";

  // detect year columns dynamically
  const headerRow = rows[4] || [];

  const yearColumns = headerRow
    .map((cell, i) => {
      if (typeof cell === "string" && cell.includes("202")) {
        return {
          year: Number(cell.slice(0, 4)),
          index: i,
        };
      }
      return null;
    })
    .filter(Boolean);

  const values = [];

  for (const row of rows.slice(5)) {
    const ags = row[0];
    if (!ags) continue;

    for (const col of yearColumns) {
      const raw = row[col.index];

      if (typeof raw !== "number") continue;

      values.push({
        regionKey: String(ags).trim(),
        year: col.year,
        value: raw,
      });
    }
  }

  return {
    indicator: {
      code: indicatorCode,
      name,
      unit,
      source_system: "GENESIS",
    },
    values,
  };
}
