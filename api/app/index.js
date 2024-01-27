const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const incomesRouter = require("./routes/incomes");
const homeRouter = require("./routes/home");
const cors = require("cors");

const app = express();

app.options("*", cors()); 
app.options('/api/users/login', cors()) // enable pre-flight requests

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://finance-tracker-client-psi.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*")

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }

  next();
});

app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/incomes", incomesRouter);
app.use("/api/home", homeRouter);

module.exports = app;
