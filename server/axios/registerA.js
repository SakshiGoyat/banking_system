const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

module.exports = function () {
  // Questions
  const registerQues = [
    {
      type: "input",
      name: "name",
      message: "Enter your name: ",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email ID: ",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password: ",
    },
    {
      type: "password",
      name: "cPassword",
      message: "Enter your confirm password: ",
    },
    {
      type: "input",
      name: "aadhaarCard",
      message: "Enter your Aadhar number: ",
    },
    {
      type: "input",
      name: "PANCard",
      message: "Enter your PAN number: ",
    },
    {
      type: "input",
      name: "PhoneNo",
      message: "Enter your phone number: ",
    },
    {
      type: "input",
      name: "FatherName",
      message: "Enter your Father's name: ",
    },
    {
      type: "password",
      name: "pin",
      message: "Enter your pin: ",
    },
    {
      type: "input",
      name: "address",
      message: "Enter your address: ",
    },
    {
      type: "input",
      name: "bankBalance",
      message: "Enter your bank balance: ",
    },
    {
      type: "input",
      name: "bankName",
      message: "Enter your bank name: ",
    },
  ];

  // register axios
  async function registerRequest(answers) {
    const config = {
      method: "post",
      url: "http://localhost:5000/register",
      data: answers,
    };

    let res = await axios(config);
      fs.writeFile(
        "accountNumber.txt",
        res.data.accountNumber,
        function (err) {
          if (err) throw err;
        }
      );
    console.log(res.data.message);
  }

  //inquirer

    inquirer.prompt(registerQues).then((answers) => {
      registerRequest(answers);
    });
};
