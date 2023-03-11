const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

module.exports = async (req, res) => {
  try {
    const { accountNumber } = req.body.data;
    let newPin = req.body.data;

    if (!accountNumber || !newPin) {
      return res.json({ error: "Please fill all the fields properly." });
    } else if (accountNumber != req.authuser.accountNumber) {
      return res.json({ error: "Invalid credentials." });
    } else {
      const userExist = await User.findOne({ accountNumber: accountNumber, email: req.authuser.email });

      // to hash
      let newpin = await newPin.toString();
      newPin = await bcrypt.hash(newpin, 10);

      if (userExist) {
        const updated = await User.updateOne(
          { accountNumber: accountNumber },
          {
            $set: {
              pin: newPin,
            },
          }
        );
        return res.json({ message: "Pin is updated successfully." });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
