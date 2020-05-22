const bcrypt = require("bcrypt");

const sendEmail = require('../../config/configEmail.js');
const userModel = require("../../models/user.model");

module.exports.postLogin = async (req, res) => {
  var u = await userModel.find();
  res.json(u);
};
