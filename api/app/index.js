const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const incomesRouter = require("./routes/incomes");
const homeRouter = require("./routes/home");
const cors = require("cors");

const app = express();

// Handle preflight requests
app.options("*", cors());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", cors(), (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/incomes", incomesRouter);
app.use("/api/home", homeRouter);

module.exports = app;
