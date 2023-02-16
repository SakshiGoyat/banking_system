const Transaction = require("../models/transaction");

module.exports = async (req, res) => {
    console.log("h");
  try {
    console.log('p1');
    console.log(req.authuser.email);
    const restore = await Transaction.find({ senderEmail: req.authuser.email });
    res.send(restore);
  } catch (err) {
    console.log(err);
  }
};