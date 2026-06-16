export const getMetadata = async (req, res) => {
  try {
    res.json([
      {
        name: "GENESIS",
        description: "Statistical indicators",
      },
      {
        name: "Unfallatlas",
        description: "Traffic accident data",
      },
    ]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error fetching metadata" });
  }
};
