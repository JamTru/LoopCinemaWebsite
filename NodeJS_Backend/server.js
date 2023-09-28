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

app.post('/users', (req, res) => {
  const sql = "INSERT INTO users ('email', 'username', 'password') VALUES (?)"
  const values = [
    req.body.email,
    req.body.username,
    req.body.password
  ]
  db.query(sql, [values], (err, data) => {
    if(err) {
      return res.json("Error");
    }
    return res.json(data);
  })
})

require("./routes/userRoutes.js")(express, app);
require("./routes/movieRoutes.js")(express, app);
require("./routes/reviewRoutes.js")(express, app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
