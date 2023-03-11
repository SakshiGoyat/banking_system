const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
// const fs = require("fs");

module.exports = async (req, res) => {
  try {
    // setting values
    const { email, password, accountNumber } = req.body;

    if (!email || !password || !accountNumber) {
      res.json({ error: "pls fill all the fields." });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    const isMatch = await bcrypt.compare(password, userLogin.password); //for comparing the user entered password with the stored encrypted password

    // console.log("accountNumber: ", accountNumber);
    // console.log("user acc ", userLogin.accountNumber);

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
        let now = new Date();
        const currentYear = now.getFullYear();

        // if(currentYear - userLogin.openingDate > 12); 
      res.json({success: "true", message: "user Login Successfully", token });
    }
  } catch (err) {
    console.log(err);
  }
};
