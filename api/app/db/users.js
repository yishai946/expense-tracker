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

  static async create(email, hashedPassword, username) {
    try {
      // check if user with same email exist
      let user = await this.findByEmail(email);
      if (user) {
        throw new Error(`email already exist`);
      }

      user = await this.findByUsername(username);
      if (user) {
        throw new Error(`username already exist`);
      }

      return await this.instance().usersCollection.insertOne({
        email,
        password: hashedPassword,
        username,
      });
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }

  // TODO: add delete to all expenses later
  static async deleteUser(userId) {
    try {
      return await this.instance().usersCollection.deleteOne({
        _id: new ObjectId(userId),
      });
    } catch (err) {
      console.error(`Error deleting user: ${err}`);
      throw new Error(`Error deleting user: ${err.message}`);
    }
  }

  static async addCategory(userId, category) {
    try {
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { categories: category } }
      );
    } catch (err) {
      console.error(`Error adding category: ${err}`);
      throw new Error(`Error adding category: ${err.message}`);
    }
  }

  static async deleteCategory(userId, category) {
    try {
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { categories: category } }
      );
    } catch (err) {
      console.error(`Error deleting category: ${err}`);
      throw new Error(`Error deleting category: ${err.message}`);
    }
  }
}

module.exports = UsersCollection;
