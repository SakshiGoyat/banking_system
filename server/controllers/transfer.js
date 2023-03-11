const User = require("../models/userSchema");
const Transaction = require("../models/transaction");
const fs = require("fs");
var senderAccountNumber = fs.readFileSync("accountNumber.txt", "utf8");

module.exports = async (req, res) => {
  try {
    const { pin, accountNumber, amount, bankName } = req.body.data;

    if (!pin || !accountNumber || !amount || !bankName) {
      return res.json({ error: "Invalid credentials" });
    }

    const currentUser = await User.findOne({ email: req.authuser.email });

    const userToTransfer = await User.findOne({ accountNumber: accountNumber });

    if (!currentUser || !userToTransfer) {
      return res.json({ error: "user doesn't exist." });
    }

    if(userToTransfer.bankName != bankName){
      return res.json({error: "user doesn't exist in bank."});
    }
    
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

      const updatedNewUser = await User.updateOne(
        { accountNumber: accountNumber },
        {
          $set: {
            bankBalance: Number(userToTransfer.bankBalance) + Number(amount),
          },
        }
      );

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
      // console.log("Transaction save ", transactionSave);
      return res.json({
        message: `Transaction is successful, and Rs.${amount} has been transfered.`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
