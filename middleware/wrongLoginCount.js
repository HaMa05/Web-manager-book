// const db = require("../db");
const userModel = require("../models/user.model");
module.exports.wrongLogin = (user) => {
  var count = user.wrongLoginCount++;
  userModel.findByIdAndUpdate(user._id, {wrongLoginCount: count});
  console.log(count);
  // db.get("users")
  //   .find({ id: user.id })
  //   .assign({ wrongLoginCount: user.wrongLoginCount })
  //   .write();
};

module.exports.resetWrongLoginCount = (user) => {
  let reset = 0;
  user.wrongLoginCount = reset;
  userModel.findByIdAndUpdate(user._id, {wrongLoginCount: reset});
  // db.get("user")
  //   .find({ id: user.id })
  //   .assign({ wrongLoginCount: user.wrongLoginCount })
  //   .write();
};
