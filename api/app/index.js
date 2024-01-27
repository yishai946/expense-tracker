const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const incomesRouter = require("./routes/incomes");
const homeRouter = require("./routes/home");
const cors = require("cors");

const app = express();

app.options("*", sendStatus(200));

app.post("/api", (req, res) => {
  res.send("Hello, world!");
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://finance-tracker-client-psi.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, application/json"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Specify allowed methods

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond with 200 OK for preflight requests
  }

  next();
});

// app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/incomes", incomesRouter);
app.use("/api/home", homeRouter);

module.exports = app;
