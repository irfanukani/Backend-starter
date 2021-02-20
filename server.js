const express = require("express");
const app = express();
// const axios = require("axios");
const cors = require("cors");
const PORT = 1337;
const nodeMailer = require("nodemailer");
require("dotenv").config();

app.use(cors());
app.use(express.json());

/*const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "webstark.yourweb@gmail.com",
    pass: "9WbBhej63pMXCs",
  },
});

var mailOptions = {
  from: "irfanukani2@gmail.com",
  to: "19dcs151@charusat.edu.in",
  subject: "Sending Email using Node.js",
  text: "Thanks for joining MyTodo App Premium!!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});*/

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task",
});

con.connect(function (err) {
  if (err) throw err;
});

app.post("/AddTodo", async (req, res) => {
  con.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
    con.query(
      "INSERT INTO TASKS (details) VALUES (?)",
      [req.body.task],
      function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        console.log(req.body.task);
        res.status(200).send("Done");
      }
    );
  });
});

app.get("/GetTodos", (req, res) => {
  con.query("SELECT details FROM TASKS", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    res.status(200).send(result);
  });
});

app.listen(PORT, () => {
  console.log("server running at : http://localhost:" + PORT);
});
