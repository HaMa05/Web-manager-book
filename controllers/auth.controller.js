const bcrypt = require("bcrypt");

const sendEmail = require('../config/configEmail.js');
const userModel = require("../models/user.model");

// middleware check đăng nhập sai nhiều lần
var wrongLoginCountFn = require("../middleware/wrongLoginCount");

// giao dien dang nhap
module.exports.login = (req, res) => {
  res.render("auth/login.pug");
};

// post thông tin đăng nhập
module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var u = await userModel.find({email: email});
  var user = u[0];
  if (!user) {
    res.render("auth/login.pug", {
      error: "Email don't exits.",
      values: req.body,
    });

    return;
  }

  // use bcrtpy that check user's password input
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) throw err;

    if (result) {
      // reset wronglogincount
      wrongLoginCountFn.resetWrongLoginCount(user);
      res.cookie("cookieId", user._id, {
        signed: true
      });
      res.redirect("/transactions");
    } else {
      // if user input fail

      wrongLoginCountFn.wrongLogin(user);

      // đăng nhập sai quá 3 lần
      if (user.wrongLoginCount >= 3) {
        sendEmail.sendMail(user.email);
        // res.send("Error acount.");
        // return;
      }

      res.render("auth/login.pug", {
        error: "Password don't exits.",
        values: req.body,
      });
      return;
    }
  });
};
