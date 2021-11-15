const express = require("express");
const PORT = 3001;
const app = express();

app.get("/sat-data", (req, res) => {
  res.json({ message: "Request for satellite data should be handled here" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
