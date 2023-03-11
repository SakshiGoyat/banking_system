const Transaction = require("../models/transaction");

module.exports = async (req, res) => {
  try {
    // console.log(req.authuser.email);
    const restore = await Transaction.find({ senderEmail: req.authuser.email });
    return res.send(restore);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};