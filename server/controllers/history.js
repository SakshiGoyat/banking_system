const Transaction = require("../models/transaction");

module.exports = async (req, res) => {
    console.log("h");
  try {
    console.log('p1');
    const restore = await Transaction.find({ email: req.authuser.email });
    res.send(restore);
    console.log(restore);
  } catch (err) {
    console.log(err);
  }
};