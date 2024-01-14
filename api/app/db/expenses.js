const { ObjectId } = require("mongodb");
const MongoDB = require("./mongodb");

class ExpensesCollection {
  constructor() {
    this.expensesCollection = MongoDB.instance().db().collection("expenses");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new ExpensesCollection();
    }
    return this._instance;
  }

  static async findById(id) {
    try {
      return await this.instance().expensesCollection.findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`error finding user by id: ${err}`);
      throw new Error(`Error finding user by id`);
    }
  }

  //   add new expense
  static async create(title, amount, date, category, userId) {
    try {
      await this.instance().expensesCollection.insertOne({
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

  //   get all expenses
  static async getAll(userId) {
    try {
      return await this.instance().expensesCollection
        .find({ userId })
        .toArray();
    } catch (err) {
      console.error(`Error getting all expenses: ${err}`);
      throw new Error(`Error getting all expenses`);
    }
  }

  //  get expense by id
  static async findById(id) {
    try {
      return await this.instance().expensesCollection.findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`Error getting expense by id: ${err}`);
      throw new Error(`Error getting expense by id`);
    }
  }

  //   update expense
  static async update(id, title, amount, date, category) {
    try {
      await this.instance().expensesCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            amount,
            date,
            category,
          },
        }
      );
    } catch (err) {
      console.error(`Error updating expense: ${err}`);
      throw new Error(`Error updating expense`);
    }
  }

  //   delete expense
  static async delete(id) {
    try {
      await this.instance().expensesCollection.deleteOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`Error deleting expense: ${err}`);
      throw new Error(`Error deleting expense`);
    }
  }
}

module.exports = ExpensesCollection;
