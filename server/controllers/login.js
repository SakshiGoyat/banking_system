const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

module.exports = async (req, res) => {
  try {
    // setting values
    const { email, password, accountNumber } = req.body;

    if (!email || !password || !accountNumber) {
      res.json({ error: "pls fill all the fields." });
    }

    const userLogin = await User.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, userLogin.password); //for comparing the user entered password with the stored encrypted password

    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials1" });
    } else if (userLogin.accountNumber != accountNumber) {
      res.status(400).json({ error: "Invalid credentials3" });
    } else {
      const token = await userLogin.generateAuthToken();

      res.json({success: "true", message: "User has Logged in Successfully", token });
    }
  } catch (err) {
    console.log(err);
  }
};
