const db = require('../db');

module.exports.wrongLogin = (user) => {
  user.wrongLoginCount++;
  db.get("users")
    .assign({'wrongLogin': user.wrongLoginCount})
    .write()
}