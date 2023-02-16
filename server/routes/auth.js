const express = require("express");
const router = express.Router();
const Evalidator = require("email-validator");
const Avalidator = require("aadhaar-validator");
const Authenticate = require("../middleware/authenticate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var senderAccountNumber = fs.readFileSync("accountNumber.txt", "utf8");
// console.log(senderAccountNumber);
// const nolookalikes = require("nanoid-generate/nolookalikes");

// importing databases.
require("../db/conn");

// require("../commander") // giving error.

//importing schema
const User = require("../models/userSchema");
const Transaction = require("../models/transaction");

// console.log(User);
// const { findOne } = require("../models/userSchema");

//changing the data into json.
router.use(express.json());

// get home route
router.get("/", (req, res) => {
  // console.log("in get route");
  res.send("in get route");
});

//post route for registration
// async and await

router.post("/register", async (req, res) => {
  // getting the values into variables.
  const {
    name,
    email,
    password,
    cPassword,
    aadhaarCard,
    PANCard,
    PhoneNo,
    FatherName,
    pin,
    address,
    bankBalance,
  } = req.body;

  // const { city, state } = address;
  //checking whether all the values are filled or not
  if (
    !name ||
    !email ||
    !password ||
    !cPassword ||
    !aadhaarCard ||
    !PANCard ||
    !PhoneNo ||
    !FatherName ||
    // !city ||
    // !state ||
    !address ||
    !pin ||
    !bankBalance
  ) {
    return res.status(404).json({ error: "plz fill the fields properly." });
  }
  // validation for email
  if (!Evalidator.validate(email)) {
    return res.json({ error: "not a validate syntax." });
  }
  // checking whether entired password or confirmed password is same or not.
  if (password != cPassword) {
    return res.json({ error: "password doesn't match" });
  }

  if (!Avalidator.isValidNumber(aadhaarCard)) {
    return res.json({ error: "not a valid aadhaar card" });
  }

  // checking bank balance

  if (bankBalance < 1000) {
    return res.json({ error: "Bank balance is less than required." });
  }
  try {
    // checking the uniqeness of email
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(404).json({ error: "email already exists." });
    }

    // const accountNumber  = nolookalikes(10);

    // registering the user.
    const user = new User({
      name,
      email,
      password,
      cPassword,
      aadhaarCard,
      PANCard,
      PhoneNo,
      FatherName,
      pin,
      address,
      bankBalance,
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "user registered successfully" });
      fs.writeFile(
        "accountNumber.txt",
        userRegister.accountNumber,
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
    } else {
      res.status(404).json({ message: "user is not registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// // login get route
// router.get("/login", async (req, res)=>{
//   res.json("in login get route.");
// })

// login post route
router.post("/login", async (req, res) => {
  try {
    // setting values
    const { email, password, accountNumber } = req.body;

    if (!email || !password || !accountNumber) {
      res.json({ error: "pls fill all the fields." });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    const isMatch = await bcrypt.compare(password, userLogin.password); //for comparing the user entered password with the stored encrypted password

    console.log("accountNumber: ", accountNumber);
    console.log("user acc ", userLogin.accountNumber);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials1" });
    } else if (userLogin.accountNumber != accountNumber) {
      res.status(400).json({ error: "Invalid credentials3" });
    } else {
      //generating JWT token while user login
      const token = await userLogin.generateAuthToken();
      // console.log(token)

      // res.cookie("jwt", token, {
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly: true,
      // });

      fs.writeFile("token.txt", token, function (err) {
        if (err) throw err;
        console.log(token);
        console.log("Token saved.");
      });
      res.json({ message: "user Login Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// res.send();

// router.get("/balance", Authenticate, async (req, res)=>{
//   res.json({message: "in balance get route"});
// })

// // check bank balance (post route)
router.get("/balance", Authenticate, async (req, res) => {
  try {
    // const { email, pin } = req.body;
    // console.log("phase 1");
    // // const {pin} = req.body;
    // if (!email || !pin) {
    //   return res.json({ error: "invalid credentials" });
    // }
    // console.log("phase 2");
    // const userExist = await User.findOne({ email: email });

    // if (!pin) {
    //   return res.json({ error: "invalid credentials" });
    // }
    // console.log("phase 3");
    // // console.log(userExist);
    // if (userExist) {
    //   const ifMatch = await bcrypt.compare(pin, userExist.pin);

    //   console.log("phase 4");
    //   console.log(ifMatch);
    //   if (ifMatch) {
    return res.json({
      message: `your bank balance is ${req.authuser.bankBalance}`,
    });
    //   }
    //   console.log("phase 5");
    // }
  } catch (err) {
    console.log(err);
  }
});

// router.get("/balance", Authenticate, (req, res) => {
//   const balance = req.authuser.bankBalance;
//   if (balance < 1000) {
//     res.json({
//       message: `Current Bank_Balance ${bankBalance}. It should be greater than Rs.1000 for user benefit`,
//     });
//     console.log(
//       `Current Bank_Balance ${bankBalance}. It should be greater than Rs.1000 for user benefit`
//     );
//   } else {
//     res.json({ message: `Current Bank_Balance ${bankBalance}` });
//     console.log(`Current Bank_Balance ${bankBalance}`);
//   }
// });

// check withdrawal money
router.post("/withdrawal", Authenticate, async (req, res) => {
  try {
    // const { email, pin, amount } = req.body;
    const { pin, amount } = req.body;

    // if (!email || !pin || !amount) {
    if (!pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    console.log("phase 1");
    const userExist = await User.findOne({ email: req.authuser.email });
    // console.log(userExist.email);
    // console.log(req.authuser.email);
    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);
      console.log("phase 2");
      // console.log(userExist.bankBalance);
      if (ifMatch) {
        console.log("phase 3");
        if (amount < userExist.bankBalance) {
          res.json({
            message: `transaction successful and ${amount} is withdrawaled.`,
          });
          const updated = await User.updateOne(
            { email: userExist.email },
            {
              $set: {
                bankBalance: userExist.bankBalance - amount,
              },
            }
          );
          // storing data in transaction schema
          const senderName = userExist.name;
          const senderEmail = userExist.email;
          const senderAccountNo = senderAccountNumber;
          const recieverName = null;
          const recieverEmail = null;
          const recieverAccountNo = null;
          const transactionType = "withdraw";

          const transaction = new Transaction({
            senderName,
            senderAccountNo,
            senderEmail,
            recieverName,
            recieverEmail,
            recieverAccountNo,
            amount,
            transactionType,
          });

          const transactionSave = await transaction.save();
          console.log("Transaction save ", transactionSave);
          return console.log(userExist.bankBalance);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// deposit
router.post("/deposit", Authenticate, async (req, res) => {
  try {
    // const { email, pin, amount } = req.body;
    const { pin, amount } = req.body;
    // console.log(amount);
    // if (!email || !pin || !amount) {
    if (!pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    const userExist = await User.findOne({ email: req.authuser.email });

    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);
      console.log(userExist.email);
      if (ifMatch) {
        res.json({ message: `transaction successful and ${amount}` });
        const updated = await User.updateOne(
          { email: userExist.email },
          {
            $set: {
              bankBalance: Number(userExist.bankBalance) + Number(amount),
            },
          }
        );
        //storing in transaction schema
          const senderName = userExist.name;
          const senderEmail = userExist.email;
          const senderAccountNo = senderAccountNumber;
          const recieverEmail = null;
          const recieverName = null;
          const recieverAccountNo = null;
          const transactionType = "deposit";

          const transaction = new Transaction({
            senderName,
            senderEmail,
            senderAccountNo,
            recieverEmail,
            recieverName,
            recieverAccountNo,
            amount,
            transactionType,
          });
          const transactionSave = await transaction.save();
          console.log("Transaction save ", transactionSave);

        return console.log(userExist.bankBalance);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// transfer
router.post("/transfer", Authenticate, async (req, res) => {
  try {
    // const { email, pin, recEmail, amount } = req.body;
    // const { email, pin, recEmail, accountNumber, amount } = req.body;
    const { pin, accountNumber, amount } = req.body;

    // if (!email || !pin || !recEmail || !accountNumber || !amount) {
          if (!pin || !accountNumber || !amount) {
            return res.json({ error: "Invalid credentials" });
          }

    const currentUser = await User.findOne({ email: req.authuser.email });

    // const userToTransfer = await User.findOne({ email: recEmail });
    const userToTransfer = await User.findOne({ accountNumber: accountNumber });

    // console.log(currentUser);
    // console.log("#######################");
    // console.log(userToTransfer);

    if (!currentUser && !userToTransfer) {
      return res.json({ error: "user doesn't exist." });
    }

    console.log("phase 1");
    if (currentUser.bankBalance > amount) {
      const updatedCurrentUser = await User.updateOne(
        { email: currentUser.email },
        {
          $set: {
            bankBalance: currentUser.bankBalance - amount,
          },
        }
      );
      // console.log(updatedCurrentUser);
      console.log("phase 2");

      const updatedNewUser = await User.updateOne(
        { accountNumber: userToTransfer.accountNumber },
        {
          $set: {
            bankBalance: Number(userToTransfer.bankBalance) + Number(amount),
          },
        }
      );
      console.log("phase 3");
          const senderName = currentUser.name;
          const senderEmail = currentUser.email;
          const senderAccountNo = senderAccountNumber;
          const recieverName = userToTransfer.name;
          const recieverEmail = userToTransfer.email;
          const recieverAccountNo = userToTransfer.accountNumber;
          const transactionType = "transfer";

          const transaction = new Transaction({
            senderName,
            senderEmail,
            senderAccountNo,
            recieverName,
            recieverEmail,
            recieverAccountNo,
            amount,
            transactionType,
          });
      const transactionSave = await transaction.save();
      console.log("Transaction save ", transactionSave);
      return res.json({
        message: `transaction is successful, and Rs. ${amount} is transfered.`,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// history

router.post("/history", Authenticate, async (req, res)=>{
  try{
    
  }catch(err){
    console.log(err);
  }
})
// deletion
router.post("/delete", async (req, res) => {
  try {
    const { email, password, accountNumber } = req.body;

    if (!email || !password || !accountNumber) {
      return res.json({ error: "invalid credentials" });
    }

    // var resp = console.log("Do you want to delete your account? (yes/no) ", process.argv[2]);

    // if(resp === 'yes'){
    const userExist = await User.deleteOne({ email: email });

    console.log(userExist);
    res.json({ message: "user deleted." });
    // }
  } catch (err) {
    console.log(err);
  }
});

// testing

router.post("/testing", (req, res) => {
  console.log(req.body);
  console.log("phase 1");
  res.send(req.body);
});

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
