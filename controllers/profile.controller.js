const cloudinary = require("cloudinary").v2;
// const db = require("../db");
const userModel = require("../models/user.model");

module.exports.profile = async (req, res) => {
  var cookieId = req.signedCookies.cookieId;
  // var user = db.get("users").find({ id: cookieId }).value();
  var user = await userModel.find({_id: cookieId });
  res.render("profile/profile.pug", {
    user: user[0],
  });
};

module.exports.updateProfile = async (req, res) => {
  var cookieId = req.signedCookies.cookieId;
  var user = await userModel.find({_id: cookieId });
  // var user = db.get("users").find({ id: cookieId }).value();

  res.render("profile/updateProfile.pug", {
    user: user[0],
  });
};

module.exports.postProfile = async (req, res) => {
  var cookieId = req.signedCookies.cookieId;
  var link_avatar = req.file.path;
  // upload file len cloudinary
  await cloudinary.uploader.upload(
    link_avatar,
    {
      folder: "/avatarUrl",
      public_id: "image",
    },
    async (error, result) => {
      console.log(result.secure_url);
      await userModel.findByIdAndUpdate(cookieId, { avatar: result.secure_url });
    }
  );

  res.redirect("/profile");
};
