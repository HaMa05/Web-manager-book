# A web app to manager book 
## Feature
* Login
* Filter data follow to user's account
* CRUD book
* CRUD user
## Send Email
* Use [nodemailer](https://nodemailer.com/)
## Config for send email
* Install
```node
npm install nodemailer --save
```
* Config
  * Create a file configEmail.js in the folder config
  * Create MAIL and PASSWORD in .env file
  * Allows less secure applications this [here](https://myaccount.google.com/lesssecureapps) for email use for send.
  * Write code into configEmail.js
  ```node
  const nodemailer = require('nodemailer');
  // suser is person to send
  module.exports.sendMail = (user) => {
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL, // user
      pass: process.env.PASSWORD // password
     }
    });

    // send mail with defined transport object
    var mailOptions = {
      from: '"Fred Foo 👻" <Hippo.webDeveloper@gmail.com>', // sender address
      to: emailUser, // list of receivers
      subject: "Cảnh báo", // Subject line
      text: "Tài khoản", // plain text body
      html: "<b>Tài khoản của bạn vừa đăng nhập sai quá 3 lần!</b>" // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
      // send fail
      if (error) {
        console.log(error);
      } else {
        // successfully
        console.log('Email sent: ' + info.response);
      }
    });
   }
  ```
