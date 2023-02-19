const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const { updateOne } = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    // const { email, pin, amount } = req.body;
    const { pin, amount } = req.body.data;

    // if (!email || !pin || !amount) {
    if (!pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    console.log("phase 1");
    const userExist = await User.findOne({ email: req.authuser.email });
    // console.log(userExist.email);
    // console.log(req.authuser.email);
    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);
      console.log("phase 2");
      console.log(req.authuser.email);
      // console.log(userExist.bankBalance);
      if (ifMatch) {
        console.log("phase 3");
        if (amount < userExist.bankBalance) {
          res.json({
            message: `transaction successful and ${amount} is withdrawaled.`,
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
          const senderAccountNo = senderAccountNumber;
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