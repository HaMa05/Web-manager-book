const shortid = require("shortid");
const db = require("../db");
const sessionModel = require("../models/session.model")

module.exports = async (req, res, next) => {
  let sessionId = shortid.generate();
  if(!req.signedCookies.sessionId) {
    res.cookie("sessionId", sessionId, {signed: true});
    sessionModel.create({sessionId: sessionId});
  }

  next();
}