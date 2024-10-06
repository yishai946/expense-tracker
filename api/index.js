const app = require("./app"); // Express app
const serverless = require("serverless-http");
require("dotenv").config();
const MongoDB = require("./app/db/mongodb");

let isDbConnected = false;

const connectToDatabase = async () => {
  if (!isDbConnected) {
    await MongoDB.instance().connect();
    isDbConnected = true;
  }
};

// Lambda handler
module.exports.handler = async (event, context) => {
  try {
    await connectToDatabase();  // Ensure the database is connected before handling the request
    const handler = serverless(app);  // Wrap your Express app
    return await handler(event, context);  // Delegate the request to the Express app
  } catch (err) {
    console.error("Failed to process request: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
