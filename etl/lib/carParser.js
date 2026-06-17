export function carsParser(rows, indicatorCode) {
  const headerRow = rows[4];

  const totalIndex = headerRow.findIndex(
    (col) => typeof col === "string" && col.trim() === "Total",
  );
  const values = [];

  for (const row of rows.slice(5)) {
    const ags = row[0];
    if (!ags) continue;

    const value = row[totalIndex];

    if (typeof value !== "number") continue;

    values.push({
      regionKey: String(ags).trim(),
      year: 2025,
      value,
    });
  }

  return {
    indicator: {
      code: indicatorCode,
      name: "Passenger cars",
      unit: "number",
      source_system: "GENESIS",
    },
    values,
  };
}
