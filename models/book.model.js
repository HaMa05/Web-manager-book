var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		picture: String
	},
	{
		collection: "books"
	}
)

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;