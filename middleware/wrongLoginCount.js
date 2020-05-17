const userModel = require("../models/user.model");

module.exports.wrongLogin = async (user) => {
   var count = user.wrongLoginCount++;
  await userModel.findByIdAndUpdate(user._id, {wrongLoginCount: count});
};

module.exports.resetWrongLoginCount = async (user) => {
  let reset = 0;
  user.wrongLoginCount = reset;
  await userModel.findByIdAndUpdate(user._id, {wrongLoginCount: reset});
};
