const { ObjectId } = require("mongodb");
const MongoDB = require("./mongodb");

class ExpensesCollection {
  constructor() {
    this.usersCollection = MongoDB.instance().db().collection("expenses");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new ExpensesCollection();
    }
    return this._instance;
  }

  static async findById(id) {
    try {
      return await this.instance().usersCollection.findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`error finding user by id: ${err}`);
      throw new Error(`Error finding user by id`);
    }
  }

  //   add new expense
  async create(title, amount, date, category, userId) {
    try {
      await this.usersCollection.insertOne({
        title,
        amount,
        date,
        category,
        userId,
      });
    } catch (err) {
      console.error(`Error creating expense: ${err}`);
      throw new Error(`Error creating expense`);
    }
  }
}

module.exports = ExpensesCollection;
