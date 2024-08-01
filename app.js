const express = require("express");
const path = require("node:path");
const Results = require("./results");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send("This is SK API.");
});

app.get("/:name", async (req, res) => {
  try {
    const { name } = req.params; // sk name. e.g. faridabad
    const results = new Results();
    await results.initialize();
    const result = results.get(name);

    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
