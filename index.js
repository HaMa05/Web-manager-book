const express = require('express');
const bodyParser = require('body-parser');
// set up that use favicon
var favicon = require('serve-favicon');
var path = require('path');

const app = express();
const port = 3000;

const bookRouter = require('./routers/book.router.js');
const userRouter = require('./routers/user.router.js');
const transactionRouter = require('./routers/transaction.router.js');
const pug = require('pug');
	app.set('view engine', 'pug');
	app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// user public
app.use(express.static('public'));

// use favicon.ico into folder /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Trang chính
app.get('/', (req, res) => {
	res.render('home.pug');
})

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));