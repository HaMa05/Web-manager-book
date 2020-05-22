
const bookModel = require("../../models/book.model");

module.exports.see = (req, res) => {

	let result = res.locals.result;
	res.json(result);
}

module.exports.add = (req, res) => {
	res.render('book/add.pug');
}

module.exports.postAddBook = (req, res) => {
	let data = req.body;

	req.body.picture = "https://picsum.photos/200";
	bookModel.insertMany(data);

	res.redirect('/books');
}

module.exports.modify = async (req, res) => {
	var books = await bookModel.find();
	res.render('book/modify.pug', {	
		books: books
	});
}

module.exports.getTitle = async (req, res) => {
	const id = req.params.id;
	var books = await bookModel.find({_id: id});
	res.render('book/modify-title.pug', {
		books: books[0]
	});
}

module.exports.postTitle = async (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	await bookModel.findByIdAndUpdate(id, {title: title});
	res.redirect('/books');
}

module.exports.delete = async (req, res) => {
	var books = await bookModel.find();
	res.render('book/delete.pug', {
		books: books
	});
}

module.exports.getDelete = async (req, res) => {

	const id = req.params.id;
	await bookModel.findByIdAndRemove(id)
	res.redirect('/books');
}