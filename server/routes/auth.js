const express = require("express");
const router = express.Router();
var Authenticate = require("../middleware/authenticate");

//database
require("../db/conn");

//controller
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const balanceController = require("../controllers/balance");
const depositController = require("../controllers/deposit");
const withdrawController = require("../controllers/withdraw");
const transferController = require("../controllers/transfer");
const historyController = require("../controllers/history");
const pinController = require("../controllers/pin");
const deleteController = require("../controllers/delete");

//changing the data into json.
router.use(express.json());

// register route
router.post("/register", registerController);

// login post route
router.post("/login", loginController);

// balance route
router.get("/balance", Authenticate, balanceController);

// pin route
router.post("/pin", Authenticate, pinController);

// withdraw route
router.post("/withdrawal", Authenticate, withdrawController);

// deposit route
router.post("/deposit", Authenticate, depositController);

// transfer route
router.post("/transfer", Authenticate, transferController);

// history route
router.get("/history", Authenticate, historyController);

// delete route
router.post("/delete", deleteController);

module.exports = router;

// if(!name){
//     console.log("error: name");
// }
// if(!email){
//     console.log("error: email");
// }
// if (!password) {
//     console.log("error: password");
// }
// if (!cPassword) {
//     console.log("error: cPassword");
// }
// if (!aadhaarCard) {
// console.log("error: add");
// }
// if (!PANCard) {
//     console.log("error: pan");
// }
// if (!PhoneNo) {
// console.log("error: phone");
// }
// if (!FatherName) {
//     console.log("error: father");
// }
// if (!pin) {
// console.log("error: pin");
// }
// if (!city) {
// console.log("error: city");
// }
// if (!state) {
// console.log("error: state");
// }
// res.json(req.body);

// using promises
// router.post("/register", (req, res) => {
//   const {
//     name,
//     email,
//     password,
//     cPassword,
//     aadhaarCard,
//     PANCard,
//     PhoneNo,
//     FatherName,
//     pin,
//     address,
//   } = req.body;
//   const { city, state } = address;
//   if (
//     !name ||
//     !email ||
//     !password ||
//     !cPassword ||
//     !aadhaarCard ||
//     !PANCard ||
//     !PhoneNo ||
//     !FatherName ||
//     !city ||
//     !state ||
//     !pin
//   ) {
//     return res.status(404).json({ error: "plz fill the fields properly." });
//   }

//   if (!Evalidator.validate(email)) {
//     return res.json({ error: "not a validate syntax." });
//   }

//   // if(!(Avalidator.validate(aadhaarCard))){
//   //     return res.json({error: "not a valid aadhaar card.."});
//   // }

//   if (password != cPassword) {
//     return res.json({ error: "password doesn't match" });
//   }

//     User.findOne({email: email}).then((userExist)=>{
//         if(userExist){
//         return res.status(404).json({ error: "email already exists." });
//         }
//             const user = new User({
//               name,
//               email,
//               password,
//               cPassword,
//               aadhaarCard,
//               PANCard,
//               PhoneNo,
//               FatherName,
//               pin,
//               address,
//             });

//             user
//               .save()
//               .then(() => {
//                 res
//                   .status(200)
//                   .json({ message: "user is registered successfully." });
//               })
//               .catch((err) => {
//                 res.status(404).json({ error: "user is not register." });
//               });
//     }).catch(err => {
//         res.status(404).json({error: "error in outer try block."});
//     })

// }
// );

// gvhadsijfksdfcjksd

// if (userLogin) {
//   const isMatch = await bcrypt.compare(password, userLogin.password);

//   // //using cookies.

//   // res.cookie("jwt", token);

//   // console.log(cookie);

//   // console.log(token);
//   if (isMatch) {
//     if (userLogin.accountNumber == accountNumber) {
//       const token = await userLogin.generateAuthToken();

//       console.log(token);
//       res.cookie("jwt", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true,
//       });
//     } else {
//       res.json({ error: "invalid acc" });
//     }


// const Evalidator = require("email-validator");
// const Avalidator = require("aadhaar-validator");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const fs = require("fs");

// var senderAccountNumber = fs.readFileSync("accountNumber.txt", "utf8");
// console.log(senderAccountNumber);
// const nolookalikes = require("nanoid-generate/nolookalikes");

// importing databases.


// require("../commander") // giving error.

//importing schema
// const User = require("../models/userSchema");
// const Transaction = require("../models/transaction");
// const { updateOne } = require("../models/userSchema");