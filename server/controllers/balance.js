const User = require("../models/userSchema");

module.exports = async (req, res) => {
  try {
    // console.log(req.authuser.email);
    return res.json(
      `Your bank balance is Rs.${req.authuser.bankBalance} only.`
    );
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
