const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { pin, amount } = req.body.data;
    if (!pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    const userExist = await User.findOne({ email: req.authuser.email });

    if (userExist) {
      const ifMatch = await bcrypt.compare(pin, userExist.pin);

      if (ifMatch) {
        res.json({ message: `Transaction successful and Rs.${amount}` });
        const updated = await User.updateOne(
          { email: userExist.email },
          {
            $set: {
              bankBalance: Number(userExist.bankBalance) + Number(amount),
            },
          }
        );
        //storing in transaction schema
        const senderName = userExist.name;
        const senderEmail = userExist.email;
        const senderAccountNo = userExist.accountNumber;
        const recieverEmail = null;
        const recieverName = null;
        const recieverAccountNo = null;
        const transactionType = "deposit";

        const transaction = new Transaction({
          senderName,
          senderEmail,
          senderAccountNo,
          recieverEmail,
          recieverName,
          recieverAccountNo,
          amount,
          transactionType,
        });
        const transactionSave = await transaction.save();
        // console.log("Transaction save ", transactionSave);

        // return console.log(userExist.bankBalance);
      }
    }
  } catch (err) {
    console.log(err);
  }
};