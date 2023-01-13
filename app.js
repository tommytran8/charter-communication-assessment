const express = require("express");
const app = express();
const port = 3000;
const dataset = require("./myDataset.json");

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/:data", (req, res) => {
  res.send(JSON.stringify(dataset));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
