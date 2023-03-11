const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const { updateOne } = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { pin, amount } = req.body.data;

    if (!pin || !amount) {
      return res.json({ error: "Please fill the fields properly." });
    }
    const userExist = await User.findOne({ email: req.authuser.email });
    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);
      // console.log(req.authuser.email);
      if (ifMatch) {
        if (amount < userExist.bankBalance) {
          res.json({
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
          // console.log("Transaction save ", transactionSave);
          return console.log(userExist.bankBalance);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};