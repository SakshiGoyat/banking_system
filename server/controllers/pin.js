const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

module.exports = async (req, res) => {
  const { accountNumber, pin, newPin } = req.body;

  if (!accountNumber || !pin || !newPin) {
    return res.json({ error: "Invalid credentials." });
  } else if (accountNumber != req.authuser.accountNumber) {
    return res.json({ error: "Invalid acc credentials." });
  }
  // else {
  //   console.log(req.authuser.email);
  //   console.log(req.authuser.pin);

  //   const ifMatch = await bcrypt.compare(pin, req.authuser.pin);
  //   console.log(ifMatch);
  //   if (!ifMatch) {
  //     return res.json({ error: "Invalid pin credentials." });
  //   }
  else {
    const userExist = await User.findOne({ accountNumber: accountNumber });

    console.log("p1");
    if (userExist) {
      console.log("p2");
      const updated = await User.updateOne(
        { accountNumber: accountNumber },
        {
          $set: {
            pin: newPin,
          },
        }
      );
      return res.json({ error: "pin is updated successfully." });
    }
  }
};