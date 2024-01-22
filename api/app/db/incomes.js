const { ObjectId } = require("mongodb");
const MongoDB = require("./mongodb");

class IncomesCollection {
  constructor() {
    this.incomesCollection = MongoDB.instance().db().collection("incomes");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new IncomesCollection();
    }
    return this._instance;
  }

  static async findById(id) {
    try {
      return await this.instance().incomesCollection.findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`error finding user by id: ${err}`);
      throw new Error(`Error finding user by id`);
    }
  }

  //   add new income
  static async create(name, amount, date, time, category, userId) {
    try {
      amount = parseFloat(amount);
      const fullDate = new Date(date);
      await this.instance().incomesCollection.insertOne({
        name,
        amount,
        fullDate,
        date,
        time,
        category,
        userId,
      });
    } catch (err) {
      console.error(`Error creating income: ${err}`);
      throw new Error(`Error creating income`);
    }
  }

  //   get all incomes
  static async getAll(userId) {
    try {
      return await this.instance()
        .incomesCollection.find({ userId })
        .sort({ date: -1, time: -1 })
        .toArray();
    } catch (err) {
      console.error(`Error getting all incomes: ${err}`);
      throw new Error(`Error getting all incomes`);
    }
  }

  //  get income by id
  static async findById(id) {
    try {
      return await this.instance().incomesCollection.findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`Error getting income by id: ${err}`);
      throw new Error(`Error getting income by id`);
    }
  }

  //   update income
  static async update(id, name, amount, date, category) {
    try {
      amount = parseFloat(amount);
      const fullDate = new Date(date);
      await this.instance().incomesCollection.updateOne(
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
      console.error(`Error updating income: ${err}`);
      throw new Error(`Error updating income`);
    }
  }

  //   delete income
  static async delete(id) {
    try {
      await this.instance().incomesCollection.deleteOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(`Error deleting income: ${err}`);
      throw new Error(`Error deleting income`);
    }
  }

  //  get incomes by category
  static async findByCategory(category, userId) {
    try {
      return await this.instance()
        .incomesCollection.find({
          category,
          userId,
        })
        .sort({ date: -1, time: -1 })
        .toArray();
    } catch (err) {
      console.error(`Error getting incomes by category: ${err}`);
      throw new Error(`Error getting incomes by category`);
    }
  }

  static async totalIncomes(userId, date) {
    try {
      const total = await this.instance()
        .incomesCollection.aggregate([
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

      return total[0]?.total;
    } catch (err) {
      console.error(`Error getting total incomes: ${err}`);
      throw new Error(`Error getting total incomes`);
    }
  }

  static async getTotalByCategories(userId) {
    try {
      const total = await this.instance()
        .incomesCollection.aggregate([
          {
            $match: {
              userId: userId,
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

      return total;
    } catch (err) {
      console.error(`Error getting total incomes: ${err}`);
      throw new Error(`Error getting total incomes`);
    }
  }
}

module.exports = IncomesCollection;
