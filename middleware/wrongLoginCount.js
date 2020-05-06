const db = require("../db");

module.exports.wrongLogin = (user) => {
  user.wrongLoginCount++;
  db.get("users")
    .find({ id: user.id })
    .assign({ wrongLoginCount: user.wrongLoginCount })
    .write();
};

module.exports.resetWrongLoginCount = (user) => {
  let reset = 0;
  user.wrongLoginCount = reset;
  db.get("user")
    .find({ id: user.id })
    .assign({ wrongLoginCount: user.wrongLoginCount })
    .write();
};
