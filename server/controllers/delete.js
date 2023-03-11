const User = require("../models/userSchema");
const transaction = require("../models/transaction");
module.exports = async (req, res) => {
  try {
    const { email, password, accountNumber } = req.body.data;

    if (!email || !password || !accountNumber) {
      return res.json({ error: "invalid credentials" });
    }

      const userExist = await User.deleteOne({ email: email });
      const transactionDeleted = await transaction.deleteMany({senderEmail: email});

      console.log(userExist);
      console.log(transactionDeleted);
      res.json({ message: "User has been deleted." });

  } catch (err) {
    console.log(err);
  }
};
