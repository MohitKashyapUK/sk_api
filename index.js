const express = require("express");
const Results = require("./results");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("This is SK API.");
});

app.get("/:name", async (req, res) => {
  const name = req.params.name; // sk name. e.g. faridabad
  const results = Results();

  await results.initialize();

  const result = results.get(name);

  res.send(result);
});

app.listen(port, () => console.log(`Listening on port ${port}`));