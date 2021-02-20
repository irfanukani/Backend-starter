// NodeMon - Refreshes server everytime we change something
// Express - Basic Backend App
// MySql - Database Queries

const express = require("express");
const App = express();
const MySql = require("mysql");
const PORT = 3001;
//Import URL

//MiddleWare Authentication , Routing , Streaming
App.use(express.json());

// TODO : Connect with DB
const conn = MySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

conn.connect((err) => {
  if (err) console.log(err);
});

//Get request - URL
App.get("/", async (req, res) => {
  conn.connect((err) => {
    //if (err) console.log(err);
    console.log("connected");
  });
  conn.query("SELECT * FROM mytodos ORDER BY id DESC", (err, result) => {
    if (err) res.status(600);
    res.send(result).status(200);
  });
});

App.get("/Add", async (req, res) => {
  let data = "MyTask";

  conn.connect((err) => {
    //if (err) console.log(err);
    console.log("connected");
  });
  conn.query("INSERT INTO mytodos (task) VALUES (?)", [data], (err, result) => {
    if (err) res.status(600);
    res.send("Done").status(200);
  });
});

App.listen(PORT, () => {
  console.log("Server Running : http://localhost:" + PORT);
});
