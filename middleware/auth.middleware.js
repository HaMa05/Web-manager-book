const userModel = require("../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
  var cookieId = req.signedCookies.cookieId;
  if(!cookieId) {
    res.redirect('/auth/login');
    return;
  }

  var user = await userModel.find({_id: cookieId});
  if(!user) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.user = user[0];
  next();
}