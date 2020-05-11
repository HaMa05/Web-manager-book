const db = require("../db");
let cookie =  db.get('countCookie').value();
module.exports.index = (req, res, next) => {
  res.render("home.pug");
};

// module.exports.createCookie = (req, res, next) => {
//   if (!req.cookies.IdCookie) {
//     cookie.count = 0;
//     db.get('countCookie')
//     .assign({'count': cookie.count})
//     .write();
//     res.cookie("IdCookie", "1233745sdqqAc6834565");
//     return;
//   }
//   next();
// }
