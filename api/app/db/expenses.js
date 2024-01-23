const { ObjectId } = require("mongodb");
const MongoDB = require("./mongodb");
const { use } = require("..");

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
  static async create(name, amount, date, time, category, userId) {
    try {
      amount = parseFloat(amount);
      const fullDate = new Date(date);
      await this.instance().expensesCollection.insertOne({
        name,
        amount,
        fullDate,
        date,
        time,
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
      return await this.instance()
        .expensesCollection.find({ userId })
        .sort({ date: -1, time: -1 })
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
  static async update(id, name, amount, date, category) {
    try {
      amount = parseFloat(amount);
      const fullDate = new Date(date);
      await this.instance().expensesCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            amount,
            fullDate,
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

  //  get expenses by category
  static async findByCategory(category, userId) {
    try {
      return await this.instance()
        .expensesCollection.find({
          category,
          userId,
        })
        .sort({ date: -1, time: -1 })
        .toArray();
    } catch (err) {
      console.error(`Error getting expenses by category: ${err}`);
      throw new Error(`Error getting expenses by category`);
    }
  }

  static async totalExpenses(userId, date) {
    try {
      const total = await this.instance()
        .expensesCollection.aggregate([
          {
            $match: {
              userId: userId,
              fullDate: { $lte: date },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount",
              },
            },
          },
        ])
        .toArray();

        return {total: total[0]?.total || 0, date: date.getDate()}
    } catch (err) {
      console.error(`Error getting total expenses: ${err}`);
      throw new Error(`Error getting total expenses`);
    }
  }

  static async getTotalByCategories(userId) {
    try {
      const totals = await this.instance()
        .expensesCollection.aggregate([
          {
            $match: {
              userId: "65a57e1ed7b3b32a038a322c",
            },
          },
          {
            $group: {
              _id: "$category",
              total: {
                $sum: "$amount",
              },
            },
          },
        ])
        .toArray();

      return totals;
    } catch (err) {
      console.error(`Error getting expenses by category: ${err}`);
      throw new Error(`Error getting expenses by category`);
    }
  }
}

module.exports = ExpensesCollection;
