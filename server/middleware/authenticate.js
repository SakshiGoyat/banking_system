const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");
// const fs = require("fs");
// var token = fs.readFileSync("token.txt", "utf8");
// console.log(token);
// console.log("authenticate.");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifyUser = await jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY
    );
    // console.log(verifyUser);

    const authuser = await userSchema.findOne({
      _id: verifyUser._id,
    });
    if (!authuser) {
      throw new Error("User not Found");
    }

    req.authuser = authuser;
    req.userID = authuser._id;

    // console.log(authuser);

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    console.log(err);
  }
};

module.exports = Authenticate;
