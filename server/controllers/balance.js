const User = require("../models/userSchema");

module.exports = async (req, res) => {
  try {
    // const { email, pin } = req.body;
    // console.log("phase 1");
    // // const {pin} = req.body;
    // if (!email || !pin) {
    //   return res.json({ error: "invalid credentials" });
    // }
    // console.log("phase 2");
    // const userExist = await User.findOne({ email: email });

    // if (!pin) {
    //   return res.json({ error: "invalid credentials" });
    // }
    // console.log("phase 3");
    // // console.log(userExist);
    // if (userExist) {
    //   const ifMatch = await bcrypt.compare(pin, userExist.pin);

    //   console.log("phase 4");
    //   console.log(ifMatch);
    //   if (ifMatch) {
    console.log(req.authuser.email);
    // console.log(req.authuser.pin);
    // return res.json({
    //   balance: `your bank balance is ${req.authuser.bankBalance}`,
    // });
        return res.json(
        `Your bank balance is ${req.authuser.bankBalance}`,
        );
    //   }
    //   console.log("phase 5");
    // }
  } catch (err) {
    console.log(err);
  }
}