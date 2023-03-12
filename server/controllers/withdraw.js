const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const { updateOne } = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { pin, amount } = req.body.data;

    if (!pin || !amount) {
      return res.json({
        success: false,
        error: "Please fill the fields properly.",
      });
    }

    const userExist = await User.findOne({ email: req.authuser.email });
    console.log(userExist);

    if (userExist) {
      console.log(userExist.pin);
      const ifMatch = await bcrypt.compare(pin, userExist.pin);
      // console.log(req.authuser.email);
      // console.log(ifMatch);
      if (!ifMatch) {
        return res.json({ success: false, error: "Pin does not match" });
      }
      if (ifMatch) {
        if (amount < userExist.bankBalance) {
          res.json({
            success: true,
            message: `Transaction is successful and Rs.${amount} has been withdrawaled.`,
          });
          const updated = await User.updateOne(
            { email: userExist.email },
            {
              $set: {
                bankBalance: Number(userExist.bankBalance) - Number(amount),
              },
            }
          );
          console.log(updated);
          // storing data in transaction schema
          const senderName = userExist.name;
          const senderEmail = userExist.email;
          const senderAccountNo = userExist.accountNumber;
          const recieverName = null;
          const recieverEmail = null;
          const recieverAccountNo = null;
          const transactionType = "withdraw";

          const transaction = new Transaction({
            senderName,
            senderAccountNo,
            senderEmail,
            recieverName,
            recieverEmail,
            recieverAccountNo,
            amount,
            transactionType,
          });

          const transactionSave = await transaction.save();
          return;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
