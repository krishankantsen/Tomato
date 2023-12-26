const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // Fix: use uppercase PORT
require("./db");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/", require("./Routes/CreateUser"));
app.use("/", require("./Routes/DisplayData"));
app.use("/", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.json({ message: "Hello I am Backend" });
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
