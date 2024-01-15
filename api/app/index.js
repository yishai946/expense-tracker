const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);

module.exports = app;
