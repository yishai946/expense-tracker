const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const incomesRouter = require("./routes/incomes");
const homeRouter = require("./routes/home");
const cors = require("cors");

const app = express();

const corsMiddleware = (req, res, next) => {
  res
    .header("Access-Control-Allow-Origin", "*")
    .header(
      "Access-Control-Allow-Headers",
      "Authorization,Accept,Origin,DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range"
    )
    .header(
      "Access-Control-Allow-Methods",
      "GET,POST,OPTIONS,PUT,DELETE,PATCH"
    );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(corsMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/incomes", incomesRouter);
app.use("/api/home", homeRouter);

module.exports = app;
