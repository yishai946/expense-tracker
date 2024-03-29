const app = require("./app");
require("dotenv").config();
const MongoDB = require("./app/db/mongodb");

const run = async () => {
    try{
        const port  = process.env.PORT;
        await MongoDB.instance().connect();
        app.listen(port, () => console.log(`Listening on port: ${port}`));
    }
    catch(err){
        console.log("Failed to start: ", err);
    }
}

run();

process.on("SIGINT", async () => {
  await MongoDB.instance().disconnect();
  process.exit(0);
});