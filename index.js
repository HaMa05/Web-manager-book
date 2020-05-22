require("dotenv").config();
// console.log(process.env.SENDGRID_API_KEY);
// console.log(process.env.SENDGRID_SECRET);
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongodb = require("mongoDB");
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect( process.env.MONGO_URL, 
  {
    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD
    },
    useNewUrlParser: true
  }
);

// set up that use favicon
var favicon = require("serve-favicon");
var path = require("path");

const app = express();
const port = 3000;

const authApiRouter = require("./api/routers/auth.router");
const transactionApiRouter = require("./api/routers/transaction.router");

const bookRouter = require("./routers/book.router.js");
const userRouter = require("./routers/user.router.js");
const transactionRouter = require("./routers/transaction.router.js");
const authRouter = require("./routers/auth.router.js");
const indexRouter = require("./routers/index.router.js");
const profileRouter = require("./routers/profile.router.js");

const paginationRouter = require("./routers/pagination.router.js");

const cookieCount = require("./middleware/cookie-count");
const middlewareAuth = require("./middleware/auth.middleware.js");
const middlewareSession = require("./middleware/session.middleware.js");

const pug = require("pug");
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(middlewareSession);
// user public
app.use(express.static("public"));

// use favicon.ico into folder /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Trang chính
app.use("/", indexRouter);

app.use("/api", authApiRouter);
app.use("/api", transactionApiRouter);

app.use("/auth", authRouter);
app.use("/books", middlewareAuth.requireAuth, bookRouter);
app.use("/users", middlewareAuth.requireAuth, userRouter);
app.use("/transactions", middlewareAuth.requireAuth, transactionRouter);
app.use("/profile", middlewareAuth.requireAuth, profileRouter);
app.use("/products", paginationRouter);


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
