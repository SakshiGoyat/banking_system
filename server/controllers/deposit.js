const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    // const { email, pin, amount } = req.body;
    const { pin, amount } = req.body;
    // console.log(amount);
    // if (!email || !pin || !amount) {
    if (!pin || !amount) {
      return res.json({ error: "invalid credentials" });
    }
    const userExist = await User.findOne({ email: req.authuser.email });

    if (userExist) {
      console.log("p1");
      console.log(userExist.pin);
      const ifMatch = await bcrypt.compare(pin, userExist.pin);

      console.log(userExist.email);
      console.log(ifMatch);
      // if (pin === userExist.pin) {
      if (ifMatch) {
        res.json({ message: `transaction successful and ${amount}` });
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
        const senderAccountNo = senderAccountNumber;
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
        console.log("Transaction save ", transactionSave);

        return console.log(userExist.bankBalance);
      }
    }
  } catch (err) {
    console.log(err);
  }
};