const express = require("express");
const router = express.Router();
const Evalidator = require("email-validator");
const Avalidator = require("aadhaar-validator");
const Authenticate = require("../middleware/authenicate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const nolookalikes = require("nanoid-generate/nolookalikes");

// importing databases.
require("../db/conn");

//importing schema
const User = require("../models/userSchema");

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

  const { city, state } = address;
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
    !city ||
    !state ||
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
    const { email, password, accountNumber } = req.body;

    if (!email || !password || !accountNumber) {
      res.json({ error: "pls fill all the fields." });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // //using cookies.
      const token = await userLogin.generateAuthToken();

      console.log(token);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      // res.cookie("jwt", token);

      // console.log(cookie);

      // console.log(token);
      if (isMatch) {
        if (userLogin.accountNumber == accountNumber) {
          res.json({ message: "User is logged in successfully." });
        } else {
          // res.json({error: "invalid acc"});
        }
      } else {
        res.json({ error: "Invalid credentials." });
      }
    }
  } catch (err) {
    console.log(err);
  }

  // res.send();
});

// router.get("/balance", Authenticate, async (req, res)=>{
//   res.json({message: "in balance get route"});
// })

// // check bank balance (post route)
router.post("/balance", async (req, res) => {
  try {
    const { email, pin } = req.body;
    console.log("phase 1");
    // const {pin} = req.body;
    if (!email || !pin) {
      return res.json({ error: "invalid credentials" });
    }
    console.log("phase 2");
    const userExist = await User.findOne({ email: email });

    if (!pin) {
      return res.json({ error: "invalid credentials" });
    }
    console.log("phase 3");
    // console.log(userExist);
    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);

      console.log("phase 4");
      console.log(ifMatch);
      if (ifMatch) {
        return res.json({ message: `${userExist.bankBalance}` });
      }
      console.log("phase 5");
    }
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
router.post("/withdrawal", async (req, res) => {
  try {
    const { email, pin, amount } = req.body;

    if (!email || !pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);

      if (ifMatch) {
        if (amount < userExist.bankBalance) {
          res.json({ message: "transaction successful." });
          const updated = await User.updateOne(
            { email: email },
            {
              $set: {
                bankBalance: userExist.bankBalance - amount,
              },
            }
          );
          return console.log(userExist.bankBalance);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// deposit
router.post("/deposit", async (req, res) => {
  try {
    const { email, pin, amount } = req.body;

    if (!email || !pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);

      if (ifMatch) {
        res.json({ message: "transaction successful." });
        const updated = await User.updateOne(
          { email: email },
          {
            $set: {
              bankBalance: userExist.bankBalance + amount,
            },
          }
        );
        return console.log(userExist.bankBalance);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// transfer

router.post("/transfer", async (req, res) => {
  try {
    const { email, pin, accountNumber, amount } = req.body;

    if (!email || !pin || !accountNumber || !amount) {
      return res.json({ error: "Invalid credentials" });
    }

    const currentUser = await User.findOne({ email: email });

    const userToTransfer = User.findOne({ accountNumber: accountNumber });
    // console.log(currentUser);
    console.log("#######################");
    console.log(userToTransfer);

  //   if (!currentUser && !userToTransfer) {
  //     return res.json({ error: "user doesn't exist." });
  //   }

  //   if (currentUser.bankBalance > amount) {
  //     const updatedCurrentUser = await User.updateOne(
  //       { email: email },
  //       {
  //         $set: {
  //           bankBalance: currentUser.bankBalance - amount,
  //         },
  //       }
  //     );
  //     // console.log(updatedCurrentUser);
  //       console.log("phase 1");

  //     const updatedNewUser = await User.updateOne(
  //       { accountNumber: userToTransfer.accountNumber },
  //       {
  //         $set: {
  //           bankBalance: userToTransfer.bankBalance + amount,
  //         },
  //       }
  //     );
  //     console.log("phase 2");
  //     return res.json({message: "transaction successful."});
    // }
  } catch (err) {
    console.log(err);
  }
});

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
