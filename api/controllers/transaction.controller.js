const shortid = require('shortid');

const bookRentsModel = require("../../models/bookRent.model");
const userModel = require("../../models/user.model");
const bookModel = require("../../models/book.model");

// admin
module.exports.indexTransaction = async (req, res) => {
	const bookRents = await bookRentsModel.find();
	const users = await userModel.find();
	var newUser = users;
	// loại bỏ tính chất object
	let a = JSON.stringify(bookRents);
	let newBookRent = [];
	newBookRent = JSON.parse(a);


	// tim user dựa vào userId của collections
	let user = newBookRent.filter((el) => {
		// el.isComplete = false và id = true
		if(el.isComplete !== true && el._id) {
			return newUser.find((user) => {
				if(String(el.userId) === String(user.id)) {
					return el.userId = user.name;
				}
			})
		}
	});

	const books = await bookModel.find();
	var newBook = books;
	// tìm title dựa vào bookId
	let userDisplay = user.filter((el) => {
		return newBook.find((book) => {
			if(String(el.bookId) === String(book.id)) {
				return el.bookId = book.title;
			}
		})
	})

	// console.log(userDisplay);
	res.json(userDisplay);
}

// // user 
// module.exports.indexTransactionUser = async (req, res, next) => {
// 	let cookieId = req.signedCookies.cookieId; // cookieId = userId

// 	// Neu la tai khoan dang nhap la admin thi chuyen sang module khac
// 	let isAdmin = await userModel.find({_id: cookieId});
// 	if(isAdmin[0].isAdmin) {
// 		next();
// 		return;
// 	}
// 	const bookRents = await bookRentsModel.find();
// 	const newUser = await userModel.find();
// 	// loại bỏ tính chất object
// 	let a = JSON.stringify(bookRents);
// 	let newBookRent = [];
// 	newBookRent = JSON.parse(a);
// 	// tim user dựa vào userId của collections
// 	let user = newBookRent.filter((el) => {
// 		// el.isComplete = false và id = true
// 		if(el.isComplete !== true && el._id && el.userId === cookieId) {
// 			return newUser.find((user) => {
// 				// console.log(el.userId);
// 				if(String(el.userId) === String(user._id)) {
// 					return el.userId = user.name;
// 				}
// 			})
// 		}
// 	});
// 	// console.log(user);
// 	const newBook = await bookModel.find();
// 	// tìm title dựa vào bookId
// 	let userDisplay = user.filter((el) => {
// 		return newBook.find((book) => {
// 			if(String(el.bookId) === String(book._id)) {
// 				return el.bookId = book.title;
// 			}
// 		})
// 	})

// 	// console.log(userDisplay);
// 	res.render('transaction/transaction.pug', {
// 		collections: userDisplay
// 	});
// 	return;
// }

// module.exports.create = async (req, res) => {
// 	let users = await userModel.find();
// 	let books = await bookModel.find();
// 	res.render('transaction/transaction-create.pug', {
// 		users: users,
// 		books: books
// 	});
// }

// module.exports.postCreate = async (req, res) => {
// 	// find id of book from title book
// 	// let id = shortid.generate();
// 	let user = await userModel.find(
// 			{
// 				name: req.body.userId
// 			}
// 		);
// 	let book = await bookModel.find(
// 			{
// 				title: req.body.bookId
// 			}
// 		);

// 	let isComplete = false;
// 	let data = req.body;
// 	req.body.userId = user[0].id;
// 	req.body.bookId = book[0].id;
// 	req.body.isComplete = isComplete;
// 	req.body.amount = 1;

// 	bookRentsModel.insertMany(data);

// 	res.redirect('/');
// }

// module.exports.finishBook = async (req, res) => {
// 	const id = req.params.id;
// 	var book = await bookRentsModel.find({_id: id});
// 	if(book[0].amount === 1) {
// 		await bookRentsModel.findByIdAndUpdate(id, {isComplete: true});
// 		res.redirect('/transactions');
// 	}
// 	await bookRentsModel.findByIdAndUpdate(id, {amount: book[0].amount - 1});
// 	res.redirect('/transactions');
// }

// // if id = null
// module.exports.errorFinish = (req, res) => {
// 	// res.send("Error !!!");
// 	res.redirect('/transactions');
// }