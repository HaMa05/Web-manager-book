const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// set up that use favicon
var favicon = require('serve-favicon');
var path = require('path');

const app = express();
const port = 3000;

const bookRouter = require('./routers/book.router.js');
const userRouter = require('./routers/user.router.js');
const transactionRouter = require('./routers/transaction.router.js');
const authRouter = require('./routers/auth.router.js');
const indexRouter = require('./routers/index.router.js');

const cookieCount = require("./middleware/cookie-count");
const middlewareAuth = require('./middleware/auth.middleware.js');

const pug = require('pug');
	app.set('view engine', 'pug');
	app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// user public
app.use(express.static('public'));

// use favicon.ico into folder /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Trang chính
app.use('/', indexRouter);

app.use('/auth', /*cookieCount.count*/ authRouter);
app.use('/books', /*cookieCount.count*/middlewareAuth.requireAuth, bookRouter);
app.use('/users', /*cookieCount.count*/middlewareAuth.requireAuth, userRouter);
app.use('/transactions', /*cookieCount.count*/middlewareAuth.requireAuth, transactionRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));