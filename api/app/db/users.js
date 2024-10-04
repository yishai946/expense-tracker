const { ObjectId } = require("mongodb");
const MongoDB = require("./mongodb");

class UsersCollection {
  constructor() {
    this.usersCollection = MongoDB.instance().db().collection("users");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new UsersCollection();
    }
    return this._instance;
  }

  static async findById(userId) {
    try {
      return await this.instance().usersCollection.findOne({
        _id: new ObjectId(userId),
      });
    } catch (err) {
      console.error(`error finding user by id: ${err}`);
      throw new Error(`Error finding user by id`);
    }
  }

  static async findByUsername(username) {
    try {
      return await this.instance().usersCollection.findOne({
        username: username,
      });
    } catch (err) {
      console.error(`error finding user by username: ${err}`);
      throw new Error(`Error finding user by username`);
    }
  }

  static async findByEmail(email) {
    try {
      return await this.instance().usersCollection.findOne({ email: email });
    } catch (err) {
      console.error(`Error finding user by email: ${err}`);
      throw new Error(`Error finding user by email: ${err.message}`);
    }
  }

  static async create(
    email,
    hashedPassword,
    username,
    name,
    isVerified = false
  ) {
    try {
      // Check if user with same email exists
      let user = await this.findByEmail(email);
      if (user) {
        throw new Error(`email already exist`);
      }

      // Check if username already exists
      user = await this.findByUsername(username);
      if (user) {
        throw new Error(`username already exist`);
      }

      // Create new user document
      return await this.instance().usersCollection.insertOne({
        email,
        name,
        password: hashedPassword,
        username,
        verified: isVerified, // Add the verified field
      });

    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Update the verified status of the user
  static async updateVerifiedStatus(userId, verified) {
    try {
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { verified: verified } } // Update the verified field
      );
    } catch (err) {
      console.error(`Error updating verification status: ${err}`);
      throw new Error(`Error updating verification status: ${err.message}`);
    }
  }

  static async deleteUser(userId) {
    try {
      await this.instance().usersCollection.deleteOne({
        _id: new ObjectId(userId),
      });

      // delete all related docs from 'expenses' and 'incomes' collections
      await MongoDB.instance().db().collection("expenses").deleteMany({
        userId: userId,
      });
      await MongoDB.instance().db().collection("incomes").deleteMany({
        userId: userId,
      });
    } catch (err) {
      console.error(`Error deleting user: ${err}`);
      throw new Error(`Error deleting user: ${err.message}`);
    }
  }

  static async addCategory(userId, category) {
    try {
      // Check if category already exists
      const user = await this.findById(userId);
      if (user.categories?.includes(category)) {
        throw new Error(`category already exist`);
      }

      // Add category using $addToSet to ensure it's unique
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { categories: category } }
      );
    } catch (err) {
      throw new Error(`Error adding category: ${err.message}`);
    }
  }

  static async deleteCategory(userId, category) {
    try {
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { categories: category } } // Remove the category from the array
      );
    } catch (err) {
      console.error(`Error deleting category: ${err}`);
      throw new Error(`Error deleting category: ${err.message}`);
    }
  }

  static async addIncomeCategory(userId, category) {
    try {
      // Check if income category already exists
      const user = await this.findById(userId);
      if (user.incomeCategories?.includes(category)) {
        throw new Error(`category already exist`);
      }

      // Add income category using $addToSet to ensure uniqueness
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { incomeCategories: category } }
      );
    } catch (err) {
      throw new Error(`Error adding income category: ${err.message}`);
    }
  }

  static async deleteIncomeCategory(userId, category) {
    try {
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { incomeCategories: category } } // Remove the category from the incomeCategories array
      );
    } catch (err) {
      console.error(`Error deleting income category: ${err}`);
      throw new Error(`Error deleting income category: ${err.message}`);
    }
  }
}

module.exports = UsersCollection;
