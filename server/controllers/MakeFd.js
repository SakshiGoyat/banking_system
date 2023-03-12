const Fd = require("../models/fdSchema");
const User = require("../models/userSchema");

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
        .json({ message: "Please fill the credentials correctly." });
    }

    if (req.authuser.bankBalance <= amount) {
      return res
        .status(404)
        .json({ message: "Sufficient bank balance is not available." });
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

    const updated = await User.updateOne(
      { accountNumber: accountNumber },
      {
        $set: {
          bankBalance: Number(req.authuser.bankBalance) - Number(amount),
        },
      }
    );
    req.authuser.fds = await req.authuser.fds.concat({ fd: newFd });
    // req.authuser.fds.push(newFd);
    console.log(req.authuser.fds);
    res.json({ message: "Fd is successfully made.", newFd });
  } catch (err) {
    console.log(err);
  }
};
