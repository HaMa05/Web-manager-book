// const db = require('../db');

const bookModel = require("../models/book.model");
// const books = db.get('books').value();

module.exports.index = (req, res) => {
	res.render('book/index.pug');
};

// module.exports.see = (req, res) => {
// 	res.render('book/see.pug', {
// 		books: books
// 	});
// }

module.exports.see = (req, res) => {

	// var books = await bookModel.find();
	let result = res.locals.result;
	res.render('book/seeBookPagination.pug', {
		books: result.perPage,
	    next: result.next,
	    page: result.page,
	    previous: result.previous
	});
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
	// console.log(books);
	// const book = db.get('books').find({id: id}).value()
	res.render('book/modify-title.pug', {
		books: books[0]
	});
}

module.exports.postTitle = async (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	await bookModel.findByIdAndUpdate(id, {title: title});
	// db.get('books')
	//   .find({_id: id})
	//   .assign({title: title})
	//   .write()
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
	// db.get('books')
	//   .remove({id: id})
	//   .write()
	res.redirect('/books');
}