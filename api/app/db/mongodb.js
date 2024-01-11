const { MongoClient } = require("mongodb");

class MongoDB {
  constructor() {
    this.url = process.env.CONNECTION_STRING;
    this.client = null;
  }

  static instance() {
    if (!this._instance) {
      this._instance = new MongoDB();
    }
    return this._instance;
  }

  async connect() {
    if (!this.client) {
      try {
        this.client = await MongoClient.connect(this.url);
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
      }
    }
    return this.client.db("expense-tracker");
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("Disconnected from MongoDB");
      this.client = null;
    }
  }

  db() {
    if (this.client) {
      return this.client.db("expense-tracker");
    } else {
      throw new Error("mongoDB not connected");
    }
  }
}

module.exports = MongoDB;
