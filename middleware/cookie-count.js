const db = require("../db");
let cookie =  db.get('countCookie').value();
module.exports.count = (req, res, next) => {
  cookie.count++;
  db.get('countCookie')
    .assign({'count': cookie.count})
    .write();
  console.log(cookie.count);
  next();
}