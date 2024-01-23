const { objectId } = require("mongodb");
const MongoDB = require("./mongodb");

class HomeCollection {
    constructor() {
    this.homeCollection = MongoDB.instance().db().collection("ho");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new ExpensesCollection();
    }
    return this._instance;
  }


