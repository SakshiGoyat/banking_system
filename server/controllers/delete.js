const User = require("../models/userSchema");
const transaction = require("../models/transaction");
module.exports = async (req, res) => {
  try {
    console.log("p1");
    const { email, password, accountNumber } = req.body.data;

    if (!email || !password || !accountNumber) {
      return res.json({ error: "invalid credentials" });
    }
      console.log("p2");

    // if (!email) {
    //   return res.json({ err: "invalid credential 1" });
    // } else if (!password) {
    //   return res.json({ err: "invalid credential 2" });
    // } else if (!accountNumber) {
    //   return res.json({ err: "invalid credential 3" });
    // } else {
      const userExist = await User.deleteOne({ email: email });
      const transactionDeleted = await transaction.deleteMany({senderEmail: email});
    // console.log("p3");

      console.log(userExist);
      console.log(transactionDeleted);
      res.json({ message: "user deleted." });

    // var resp = console.log("Do you want to delete your account? (yes/no) ", process.argv[2]);

    // if(resp === 'yes'){
    // const userExist = await User.deleteOne({ email: email });

    // console.log(userExist);
    // res.json({ message: "user deleted." });
    // }
  } catch (err) {
    console.log(err);
  }
};
