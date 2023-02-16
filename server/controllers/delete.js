const User = require("../models/userSchema");

module.exports = async (req, res) => {
  try {
    const { email, password, accountNumber } = req.body;

    if (!email || !password || !accountNumber) {
      return res.json({ error: "invalid credentials" });
    }

    // var resp = console.log("Do you want to delete your account? (yes/no) ", process.argv[2]);

    // if(resp === 'yes'){
    const userExist = await User.deleteOne({ email: email });

    console.log(userExist);
    res.json({ message: "user deleted." });
    // }
  } catch (err) {
    console.log(err);
  }
};
