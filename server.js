const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./src/models/index");
const leadsRouter = require("./src/routes/leads.route");
const interactionRouter = require("./src/routes/interactions.route");

const app = express();

app.use(express.json());

app.use("/api/leads", leadsRouter);
app.use("/api/interactions", interactionRouter);

app.get("/", (req, res) => {
  res.send("welcome to nodejs-postgresql server.");
});

const port = process.env.APP_PORT || 5656;

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
