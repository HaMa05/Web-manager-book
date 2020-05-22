
const bookModel = require("../../models/book.model");

module.exports.see = (req, res) => {

	let result = res.locals.result;
	res.json(result);
}

module.exports.postAddBook = (req, res) => {
	let data = req.body;
  req.body.picture = "https://picsum.photos/200";
  
	res.json(data);
}

module.exports.modify = async (req, res) => {
	var books = await bookModel.find();
	res.json(books);
}

module.exports.getTitle = async (req, res) => {
	const id = req.params.id;
	var books = await bookModel.find({_id: id});
	res.json(books[0]);
}

module.exports.postTitle = async (req, res) => {
	// const id = req.body.id;
	// const title = req.body.title;
	res.json(req.body);
}

module.exports.delete = async (req, res) => {
	var books = await bookModel.find();
	res.json(books);
}

module.exports.getDelete = async (req, res) => {

	// const id = req.params.id;
	// await bookModel.findByIdAndRemove(id)
	res.json(req.body);
}