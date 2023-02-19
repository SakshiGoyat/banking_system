const Evalidator = require("email-validator");
const Avalidator = require("aadhaar-validator");
const User = require("../models/userSchema");

const fs = require("fs");

module.exports = async (req, res) => {
  // storing the values into variables.
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
    console.log(err.data);
  }
};
