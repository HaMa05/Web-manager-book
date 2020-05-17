// const db = require("../db");
module.exports.perPage = (model) => {
  return async (req, res, next) => {
    const xModel = require("../models/" + model + ".model");
    var curDB =  await xModel.find();

    let page = parseInt(req.query.page) || 1;
    let limit = 10;
    let start = (page - 1) * limit;
    let end = page * limit;

    let result = {};
    if (end < curDB.length) {
      result.next = page + 1;
    }

    result.page = page;

    if (start > 0) {
      result.previous = page - 1;
    }

    result.perPage = curDB.slice(start, end);
    res.locals.result = result;
    next();
  };
};
