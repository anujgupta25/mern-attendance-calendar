const express = require("express");
const con = require("./connection");
const Model = require("./model");
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors())
app.post("/create", async (req, res) => {
  const { date, status } = req.body;
  const body = new Model({
    date,
    status,
  });
  const resp = await body.save();
  return res.status(200).json(resp);
});

app.post("/fetchByDate", async (req, res) => {
  const resp = await Model.findOne({ date: req.body.date });
  return res.status(200).json(resp);
});

app.patch("/update", async (req, res) => {
  if (!(req.body.date && req.body.status)) {
    return res.status(400).json("Failed");
  }
  const { date, status } = req.body;
 
  const resp = await Model.findOneAndUpdate({ date: date }, { status: status });

  if (!resp) {
    const body = new Model({
      date,
      status,
    });

    const add = await body.save();
    return res.status(200).json(add);
  }
  return res.status(200).json(resp);
});

app.listen(4144, () => {
  console.log("server started listening ..");
});
