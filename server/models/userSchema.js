const mongoose = require("mongoose");
// const nolookalikes = require("nanoid-generate/nolookalikes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { customAlphabet }  = import("nanoid");
// var _nanoid = import("nanoid");
// const nanoid = customAlphabet("1234567890", 10);

// const nolookalikesRndString = nolookalikes(10);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    lowerCase: true,
    upperCase: true,
    Symbol: true,
  },
  cPassword: {
    type: String,
    required: true,
    lowerCase: true,
    upperCase: true,
    Symbol: true,
  },

  aadhaarCard: {
    type: String,
    required: true,
    unique: true,
  },

  PANCard: {
    type: Number,
    required: true,
    unique: true,
    // maxLength: 10,
    // minLength: 10,
  },
  PhoneNo: {
    type: String,
    required: true,
    // maxLength: 10,
    // minLength: 10,
  },
  FatherName: {
    type:String,
    required: true,
  },
  // address: {
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  // },
  address: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    // default: nolookalikesRndString,
    // default: nanoid
  },
  openingDate: {
    type: String,
    required: true,
    // default: Date.now() / year,
    default: Date,
  },
  expiryDate: {
    type: String,
    required: true,
    default: Date().year + 5,
    // default: Date
  },
  pin: {
    type: String,
    required: true,
  },
  bankBalance: {
    type: Number,
    required: true
  },
  bankName:{
    type: String, 
    required: true
  },
  // transactions:[
  //   {
  //     transactionType:{
  //       type: String,
  //       enum: ["withdraw", "deposit", "transfer"],
  //     }
  //   }
  // ]
});

userSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    // console.log("hi from bcrypt");
    let newPassword = this.password.toString();
    this.password = await bcrypt.hash(newPassword, 12);
    let newCpassword = this.cPassword.toString();
    this.cPassword = await bcrypt.hash(newCpassword, 12);
  }

  if (this.isModified("pin")) {
    let newpin = this.pin.toString();
    this.pin = await bcrypt.hash(newpin, 10);
  }

  if (this.isModified("PhoneNo")) {
    let newPhone = this.PhoneNo.toString();
    this.PhoneNo = await bcrypt.hash(newPhone, 10);
  }
  next();
});

// userSchema.pre(
//   "updateOne",
//   { document: true, query: false },
//   async function (next) {
//     // if (this.isModified("password")) {
//     //   // console.log("hi from bcrypt");
//     //   let newPassword = this.password.toString();
//     //   this.password = await bcrypt.hash(newPassword, 12);
//     //   let newCpassword = this.cPassword.toString();
//     //   this.cPassword = await bcrypt.hash(newCpassword, 12);
//     // }
//     console.log("updateOne middleware");

//     if (this.isModified("newPin")) {
//       console.log("new pin", this.newPin);
//       let newpin = this.newPin.toString();
//       console.log("new pin stored", newpin);
//       console.log("this.pin", this.pin);
//       this.newPin = await bcrypt.hash(newpin, 10);
//       console.log("this.pin after hash", this.pin);
//     }

//     // if (this.isModified("phoneNo")) {
//     //   let newPhone = this.PhoneNo.toString();
//     //   this.PhoneNo = await bcrypt.hash(newPhone, 10);
//     // }
//     next();
//   }
// );
userSchema.methods.generateAuthToken = async function () {
  try {
    // console.log(process.env.SECRET_KEY);
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // this.tokens = this.tokens.concat({ token: token });
    // await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("users", userSchema);
module.exports = User;

// tokens: [
//   {
//     token: {
//       type: String,
//       required: true,
//     },
//   },
// ],
