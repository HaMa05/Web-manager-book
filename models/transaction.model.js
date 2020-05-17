var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema(
	{
		userId: String,
		bookId: String,
		amount: Number,
		isComplete: Boolean
	},
	{
		collection: "transactions"
	}
)

var Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;