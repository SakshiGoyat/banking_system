const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const fs = require("fs");
var senderAccountNumber = fs.readFileSync("accountNumber.txt", "utf8");

module.exports = async (req, res) => {
  try {
    // const { email, pin, recEmail, amount } = req.body;
    // const { email, pin, recEmail, accountNumber, amount } = req.body;
    const { pin, accountNumber, amount } = req.body.data;

    // if (!email || !pin || !recEmail || !accountNumber || !amount) {
    if (!pin || !accountNumber || !amount) {
      return res.json({ error: "Invalid credentials" });
    }

    const currentUser = await User.findOne({ email: req.authuser.email });

    // const userToTransfer = await User.findOne({ email: recEmail });
    const userToTransfer = await User.findOne({ accountNumber: accountNumber });

    // console.log(currentUser);
    // console.log("#######################");
    // console.log(userToTransfer);

    if (!currentUser || !userToTransfer) {
      return res.json({ error: "user doesn't exist." });
    }

    console.log("phase 1");
    console.log(req.authuser.email);
    if (currentUser.bankBalance > amount) {
      const updatedCurrentUser = await User.updateOne(
        { email: currentUser.email },
        {
          $set: {
            bankBalance: Number(currentUser.bankBalance) - Number(amount),
          },
        }
      );
      // console.log(updatedCurrentUser);
      console.log("phase 2");

      const updatedNewUser = await User.updateOne(
        { accountNumber: accountNumber },
        {
          $set: {
            bankBalance: Number(userToTransfer.bankBalance) + Number(amount),
          },
        }
      );
      console.log("phase 3");
      const senderName = currentUser.name;
      const senderEmail = currentUser.email;
      const senderAccountNo = senderAccountNumber;
      const recieverName = userToTransfer.name;
      const recieverEmail = userToTransfer.email;
      const recieverAccountNo = userToTransfer.accountNumber;
      const transactionType = "transfer";

      const transaction = new Transaction({
        senderName,
        senderEmail,
        senderAccountNo,
        recieverName,
        recieverEmail,
        recieverAccountNo,
        amount,
        transactionType,
      });
      const transactionSave = await transaction.save();
      console.log("Transaction save ", transactionSave);
      return res.json({
        message: `transaction is successful, and Rs. ${amount} is transfered.`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
