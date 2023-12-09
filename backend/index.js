const express = require("express");
const app = express();
const port = process.env.port || 5000;
require("./db"); // make sure this path is correct and the file exists
const cors = require("cors");
const path = require("path");

// connecting frontend with backend
app.use(cors());

app.use(express.json());

app.use("/", require("./Routes/CreateUser")); // make sure these routes are correctly defined
app.use("/", require("./Routes/DisplayData"));
app.use("/", require("./Routes/OrderData"));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html")),
    function (err) {
      res.status(500).send(err);
    };
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
