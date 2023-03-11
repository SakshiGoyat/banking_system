const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const fdSchema = new mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interest: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    fdDate: {
      type: Date,
      required: true,
    },
    token: {
      type: Number,
      required: true,
    },
    nominee: {
      type: String,
      required: true,
    },
  },
]);

// fdSchema.methods.generateAuthToken1 = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
const FD = mongoose.model("fd", fdSchema);
module.exports = FD;
