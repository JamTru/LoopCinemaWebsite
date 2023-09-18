const express = require("express");
const cors = require("cors");
const db = require("./database");

db.sync();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req,res) => {
  res.json({message:"Test Message Please Confirm"});
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
