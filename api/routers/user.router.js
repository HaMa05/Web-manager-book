const express = require("express");
// const generatePassword = require('password-generator');
const controllerUser = require("../controllers/user.controller.js");
const validationUser = require("../../validation/user.validation.js");
const paginationMiddleware = require("../../middleware/pagination.middleware");

const router = express.Router();

// xem user
router.get("/see", paginationMiddleware.perPage("user"), controllerUser.see);

// thêm user
// router.get("/add", controllerUser.add);
router.post("/add/user", validationUser.postUser, controllerUser.postUser);

// xóa user
router.get("/delete", controllerUser.deleteUser);
router.get("/:id/delete", controllerUser.getDelete);

module.exports = router;
