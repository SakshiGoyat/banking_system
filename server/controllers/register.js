const Evalidator = require("email-validator");
const Avalidator = require("aadhaar-validator");
const User = require("../models/userSchema");
const nolookalikes = require("nanoid-generate/nolookalikes");
// const fs = require("fs");

module.exports = async (req, res) => {
  // storing the values into variables.
  const {
    name,
    email,
    password,
    cPassword,
    age,
    gender,
    DOB,
    aadhaarCard,
    PANCard,
    PhoneNo,
    FatherName,
    pin,
    city,
    state,
    country,
    bankBalance,
    bankName,
    accountType
  } = req.body;

  // const { city, state } = address;
  //checking whether all the values are filled or not
  if (
    !name ||
    !email ||
    !password ||
    !cPassword ||
    !age ||
    !gender ||
    !DOB ||
    !aadhaarCard ||
    !PANCard ||
    !PhoneNo ||
    !FatherName ||
    !city ||
    !state ||
    !country ||
    !pin ||
    !bankBalance ||
    !bankName ||
    !accountType
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

    const accountNumber  = nolookalikes(10);
    const CIF = Math.floor(Math.random()*1000000000000);
    let address = {
      city: city,
      state: state,
      country: country
    }
    // registering the user.
    const user = new User({
      name,
      email,
      password,
      cPassword,
      age,
      gender,
      DOB,
      aadhaarCard,
      PANCard,
      PhoneNo,
      FatherName,
      pin,
      address,
      accountNumber,
      bankBalance,
      bankName,
      accountType,
      CIF
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "user registered successfully", accountNumber, CIF });
    } else {
      res.status(404).json({ message: "user is not registered successfully"});
    }
  } catch (err) {
    console.log(err);
  }
};
