const Evalidator = require("email-validator");
const Avalidator = require("aadhaar-validator");
const User = require("../models/userSchema");
const nolookalikes = require("nanoid-generate/nolookalikes");

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
    accountType,
  } = req.body;

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
    return res
      .status(404)
      .json({ error: "Please fill all the fields properly." });
  }
  // validation for email
  if (!Evalidator.validate(email)) {
    return res.json({ error: "Credentials' validation error e." });
  }
  // checking whether entired password or confirmed password is same or not.
  if (password != cPassword) {
    return res.json({ error: "Credentials' validation error p." });
  }

  // aadhar card validation
  if (!Avalidator.isValidNumber(aadhaarCard)) {
    return res.json({ error: "Credentials' validation error a." });
  }

  // const aadhaarExist = User.findOne({aadhaarCard: aadhaarCard});
  // console.log(aadhaarExist);
  // if(aadhaarExist){
  //   return res.json({ error: "Credentials' validation error an." });
  // }
  // checking bank balance
  if (bankBalance < 1000) {
    return res.json({ error: "Bank balance is less than required." });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(404).json({ error: "email already exists." });
    }

    const accountNumber = nolookalikes(10);
    const CIF = Math.floor(Math.random() * 1000000000000);
    let openingDate = new Date();
    // const openingDate = now.getFullYear();
    let address = {
      city: city,
      state: state,
      country: country,
    };
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
      openingDate,
      pin,
      address,
      accountNumber,
      bankBalance,
      bankName,
      accountType,
      CIF,
    });

    const userRegister = await user.save();
    const userLogin = await User.findOne({ email: email });

    if (userRegister) {
      const token = await userLogin.generateAuthToken();
      return res
        .status(201)
        .json({
          success: "true",
          message: "user registered successfully",
          accountNumber,
          CIF,
          token,
        });
    } else {
      return res
        .status(404)
        .json({
          success: "false",
          error: "user is not registered successfully",
        });
    }
  } catch (err) {
    console.log(err.data);
    return res.status(404).json({ error: err.data });
  }
};
