const app = require("./app");
require("dotenv").config();
const MongoDB = require("./app/db/mongodb");

const run = async () => {
    try{
        const port  = process.env.PORT || 5000;
        await MongoDB.instance().connect();
        app.listen(port, () => console.log(`Listening on port: ${port}`));
    }
    catch(err){
        console.error("Failed to start: ", err);
    }
}

run();

process.on("SIGINT", async () => {
  await MongoDB.instance().disconnect();
  process.exit(0);
});