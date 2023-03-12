const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

module.exports = async (req, res) => {
  try {
    const { accountNumber } = req.body.data;
    const newPin = req.body.data.newPin;

    if (!accountNumber || !newPin) {
      return res.json({
        success: false,
        error: "Please fill all the fields properly.",
      });
    } else if (accountNumber != req.authuser.accountNumber) {
      return res.json({ success: false, error: "Invalid credentials." });
    } else {
      const userExist = await User.findOne({
        accountNumber: accountNumber,
        email: req.authuser.email,
      });
      console.log("Before updation " + req.authuser.pin);
      // to hash
      let newpin = await newPin.toString();
      const hashPin = await bcrypt.hash(newpin, 10);
      console.log(hashPin);
      if (userExist) {
        const updated = await User.updateOne(
          { accountNumber: accountNumber },
          {
            $set: {
              pin: hashPin,
            },
          }
        );
        console.log(updated);
        console.log("After updation " + req.authuser.pin);

        return res.json({
          success: true,
          message: "Pin has been updated successfully.",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
