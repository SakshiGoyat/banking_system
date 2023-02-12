const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const Authenticate = require("../MiddleWare/other");
const cookieParser = require("cookie-parser");

require("../db/conn");
const User = require("../models/userSchema");
const Transaction = require("../models/transactionSchema");

router.get("/", (req, res) => {
  res.send("hellow world");
});

// router.post('/register',async(req,res)=>{
//     const {FirstName, LastName, Email, Password, C_Password, Pin,Bank_Balance, AadhaarCard, PANCard, PhoneNo, FatherName, Address}=req.body//how to add address city and state
//     if(!FirstName|| !LastName|| !Email|| !Password|| !C_Password|| !Pin||!Bank_Balance|| !AadhaarCard|| !PANCard|| !PhoneNo|| !FatherName|| !Address){
//         return res.status(422).json({error:'error'})
//     }
//     // return res.json(req.body);

//     User.findOne({Email:Email})//database email: user input email
//     .then((userExit)=>{
//         if(userExit){
//             return res.status(422).json({error:"Email already exist"});
//         }
//         const user=new User({FirstName, LastName, Email, Password, C_Password, Pin,Bank_Balance, AadhaarCard, PANCard, PhoneNo, FatherName, Address});

//         user.save().then(()=>{
//                 res.status(201).json({message:"user registered successfully"});
//             }).catch((err)=>res.status(500).json({error:"Failed to registered"}));
//         })
//     }).catch((err)=>{
//         console.log(err);
//     });

router.post("/register", async (req, res) => {
  const {
    FirstName,
    LastName,
    Email,
    Password,
    C_Password,
    Pin,
    Bank_Balance,
    AadhaarCard,
    PANCard,
    PhoneNo,
    FatherName,
    Address,
  } = req.body; //how to add address city and state
  if (
    !FirstName ||
    !LastName ||
    !Email ||
    !Password ||
    !C_Password ||
    !Pin ||
    !Bank_Balance ||
    !AadhaarCard ||
    !PANCard ||
    !PhoneNo ||
    !FatherName ||
    !Address
  ) {
    return res.status(422).json({ error: "error" });
  }
  // return res.json(req.body);

  try {
    const userEmail = await User.findOne({ Email: Email }); //database email: user input email
    const usePassword = await User.findOne({ Password: Password });
    const usePin = await User.findOne({ Pin: Pin });

    if (userEmail) {
      return res.status(422).json({ error: "Already exist Credentials" });
    } else if (usePassword) {
      return res.status(422).json({ error: "Already exist Credentials" });
    } else if (usePin) {
      return res.status(422).json({ error: "Already exist Credentials" });
    } else {
      const user = new User({
        FirstName,
        LastName,
        Email,
        Password,
        C_Password,
        Pin,
        Bank_Balance,
        AadhaarCard,
        PANCard,
        PhoneNo,
        FatherName,
        Address,
      });

      console.log(user.AccountNo); //randomly generated AccountNo

      //hashing the password need to be added here***********************************************************************************************
      // const userRegister=await user.save();
      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login router
router.post("/signin", async (req, res) => {
  try {
    const { Email, Password, Pin, AccountNo } = req.body;
    if (!Email || !Password || !Pin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const userLogin = await User.findOne({ Email: Email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(Password, userLogin.Password); //for comparing the user entered password with the stored encrypted password
      const isMatchPin = await bcrypt.compare(Pin, userLogin.Pin);
      const isMatchAccountNo = await bcrypt.compare(
        AccountNo,
        userLogin.AccountNo
      );
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials1" });
      } else if (!isMatchPin) {
        res.status(400).json({ error: "Invalid credentials2" });
      } else if (!isMatchAccountNo) {
        res.status(400).json({ error: "Invalid credentials3" });
      } else {
        // console.log(userLogin)
        //generating JWT token while user login
        const token = await userLogin.generateAuthToken();
        // console.log(token)

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.json({ message: "user Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials.................." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/balance", Authenticate, (req, res) => {
  const balance = req.authuser.Bank_Balance;
  if (balance < 1000) {
    res.json({
      message: `Current Bank_Balance ${balance}. It should be greater than Rs.1000 for user benefit`,
    });
    console.log(
      `Current Bank_Balance ${balance}. It should be greater than Rs.1000 for user benefit`
    );
  } else {
    res.json({ message: `Current Bank_Balance ${balance}` });
    console.log(`Current Bank_Balance ${balance}`);
  }
});

router.get("/withdrawal", Authenticate, (req, res) => {
  const withdrawal = req.body.withdrawal;
  const balance = req.authuser.Bank_Balance;

  if (balance < 1000) {
    return res.json({
      message: `Current Bank_Balance ${balance}... less than required.`,
    });
  } else {
    ///everything is working but the update function is not working???????????????????????????????????????????????
    User.findByIdAndUpdate(
      req.authuser._id,
      {
        Bank_Balance: 1234,
      },
      (err, data) => {
        if (err) {
          return res.json({ message: `error` });
        } else {
          res.json({
            message: `After Withdrawal Current Bank_Balance ${req.authuser.Bank_Balance}`,
          });
          console.log(`After Withdrawal Current Bank_Balance ${data}`);
        }
      }
    );
  }
});

router.get("/deposite", Authenticate, (req, res) => {
  const deposite = req.body.deposite;
  const balance = req.authuser.Bank_Balance;
  ///everything is working but the update function is not working???????????????????????????????????????????????
  User.findByIdAndUpdate(
    req.authuser._id,
    {
      Bank_Balance: deposite + balance,
    },
    (err, data) => {
      if (err) {
        return res.json({ message: `error` });
      } else {
        res.json({
          message: `After Withdrawal Current Bank_Balance ${req.authuser.Bank_Balance}`,
        });
        console.log(
          `After Withdrawal Current Bank_Balance ${req.authuser.Bank_Balance}`
        );
      }
    }
  );
});

router.post("/transaction", Authenticate, async (req, res) => {
  const { FirstNameR, LastNameR, AccountNoR, Pin, Amount } = req.body; //how to add address city and state
  if (!FirstNameR || !LastNameR || !AccountNoR || !Pin || !Amount) {
    return res.status(422).json({ error: "error" });
  }
  // return res.json(req.body);

  try {
    const userEmail = await Transaction.findOne({ Email: Email }); //database email: user input email

    if (userEmail) {
      return res.status(422).json({ error: "Already exist Credentials" });
    } else {
      const userTransaction = new Transaction({
        FirstNameR,
        LastNameR,
        AccountNoR,
        Pin,
        Amount,
      });

      //hashing the password need to be added here***********************************************************************************************

      // const userRegister=await user.save();
      await userTransaction.save();
      res.status(201).json({ message: "transaction added successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/delete", Authenticate, (req, res) => {
  ///everything is working but the update function is not working???????????????????????????????????????????????
  User.findOneAndReplace(req.authuser._id, function (err) {
    if (!err) {
      console.log("Account successfully deleted");
      res.json({ message: "Account successfully deleted" });
    }
  });
});

module.exports = router;
