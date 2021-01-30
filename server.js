const express = require("express");
const app = express();

const PORT = 1337;

app.get("/", (req, res) => {
  res.send("I am Your Backend");
});

app.listen(PORT, () => {
  console.log("server running at : http://localhost:" + PORT);
});
