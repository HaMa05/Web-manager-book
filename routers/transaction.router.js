const express = require("express");
const router = express.Router();

const controllerTransaction = require("../controllers/transaction.controller.js");


router.get("/", controllerTransaction.indexTransactionUser, controllerTransaction.indexTransaction);

// router.get("/", controllerTransaction.indexTransactionUser);

router.get("/create", controllerTransaction.create);

router.post("/", controllerTransaction.postCreate);

router.get("/:id/complete", controllerTransaction.finishBook);

// improve if id = null url = (transaction//complete)
router.get("/complete", controllerTransaction.errorFinish);

module.exports = router;
