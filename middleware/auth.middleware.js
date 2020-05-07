const db = require("../db");
module.exports.requireAuth = (req, res, next) => {
  var cookieId = req.signedCookies.cookieId;
  if(!cookieId) {
    res.redirect('/auth/login');
    return;
  }

  var user = db.get("users").find({id: cookieId}).value();
  if(!user) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.user = user;
  next();
}