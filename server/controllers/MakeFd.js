const Fd = require("../models/fdSchema");

const fdir = [
  [7, 45, 3, 3.5],
  [46, 179, 4.5, 5.0],
  [180, 210, 5.35, 5.75],
  [211, 365, 5.88, 6.25],
];

module.exports = async (req, res) => {
  try {
    const { option, amount, nominee } = req.body.data;

    if (!amount || !option || !nominee) {
      return res
        .status(400)
        .json({ error: "pls fill the credentials correctly." });
    }

    //name
    const name = req.authuser.name;
    // generating token
    const token = Math.floor(Math.random() * 10000);
    // storing interest
    let interest;
    if (req.authuser.age > 60) {
      interest = fdir[option - 1][3];
    } else {
      interest = fdir[option - 1][2];
    }

    // storing date
    let fdDate = new Date();

    // account number
    var accountNumber = req.authuser.accountNumber;
    // min time
    let min = fdir[option - 1][0];
    let max = fdir[option - 1][1];
    //making schema
    const newFd = new Fd({
      name,
      accountNumber,
      amount,
      interest,
      min,
      max,
      fdDate,
      token,
      nominee,
    });

    newFd.save();
    
    // req.authuser.fd = req.authuser.fd.push(newFd);
    req.authuser.fds = req.authuser.fds.push(newFd);
    console.log(req.authuser.fds);
    res.json({ message: "Fd is successfully made.", newFd });
  } catch (err) {
    console.log(err);
  }
};
