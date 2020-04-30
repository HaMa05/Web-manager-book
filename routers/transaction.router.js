const express = require("express");
const router = express.Router();

const controllerTransaction = require("../controllers/transaction.controller.js");

router.get("/", controllerTransaction.indexTransaction);

router.get("/create", controllerTransaction.create);

router.post("/", controllerTransaction.postCreate);

router.get("/:id/complete", controllerTransaction.finishBook);

// improve if id = null
router.get("/complete", controllerTransaction.errorFinish);

module.exports = router;
