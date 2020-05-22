const express = require("express");
const router = express.Router();

const controllerTransaction = require("../controllers/transaction.controller.js");


router.get("/transaction",/* controllerTransaction.indexTransactionUser,*/ controllerTransaction.indexTransaction);

router.post("/transaction", controllerTransaction.postCreate);

module.exports = router;
