const express = require("express");
const nolookalikes = require("nanoid-generate/nolookalikes");
// const dotenv = require('dotenv');
// const mongoose = require("mongoose");
require("./db/conn");

const app = express();
const Port = process.env.Port || 5000;

app.use(require("./routes/auth"));
const user = require("./models/userSchema");

// generating a random string

// const nolookalikesRndString = nolookalikes(10);
// console.log(nolookalikesRndString);

// dotenv.config({path: './config.env'});

//mongoose setup
// mongoose.connect("mongodb://localhost:27017/bankDB");

// creating database
// const db = mongoose.connect("mongodb://localhost:27017/bankDB");

// current date function
// function date() {
//   const date = new Date();

//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   };

//   return date.toLocaleDateString("en-US", options);
// }

// user schema
// const users = new mongoose.Schema({
//   firstName: String,
//   emailId: String,
//   password: String,
//   confirmPassword: String,
//   pin: {
//     type: Number,
//   },
//   currentDate: date(),
//   expiryDate: (date().year + 5),
//   bankBalance: Number,
//   aadharCard: String,
  
// });
// creating collections
// const User = require("./models/users");
// const Transaction = require("./models/transactions");

// middle ware 
const middleware = (req, res, next) =>{
  console.log(`Hello my middleware`);
  next();
}


app.get("/", middleware, (req, res)=>{
  res.send("Hello World!!!");
});

app.get("/signUp", (req, res) => {
  //Print passbook
});

app.post("/signUp", (req, res) => {
  // sign up
});

app.get("/signIn", (req, res) => {
  // print user data
});

app.post("/signIn", (req, res) => {});

// local port
app.listen(Port, () => {
  console.log(`listening to port ${Port}`);
});
