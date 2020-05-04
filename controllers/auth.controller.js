const md5 = require("md5");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = require("../db");
// middleware check đăng nhập sai nhiều lần
var wrongLoginCountFn = require("../middleware/wrongLoginCount");

// giao dien dang nhap
module.exports.login = (req, res) => {
  res.render("auth/login.pug");
};

// post thông tin đăng nhập
module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = db.get("users").find({ email: email }).value();
  if (!user) {
    res.render("auth/login.pug", {
      error: "Email don't exits.",
      values: req.body,
    });

    return;
  }

  // đăng nhập sai quá 4 lần
  if (user.wrongLoginCount > 4) {
    res.send("Error acount.");
    return;
  }

  // var hashedPassword = md5(password);
  // use bcrtpy that check user's password input
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) throw err;

    if (result) {
      res.cookie("cookieId", user.id);
      res.redirect("/transactions");
    } else {
      // if user input fail
      wrongLoginCountFn.wrongLogin(user);
      res.render("auth/login.pug", {
        error: "Password don't exits.",
        values: req.body,
      });
      return;
    }
  });
  // if(user.password !== hashedPassword) {
  // 	res.render('auth/login.pug', {
  // 		error: "Password don't exits.",
  // 		values: req.body
  // 	});
  // 	return;
  // }

  // res.cookie("cookieId", user.id);
  // res.redirect('/transactions');
};
