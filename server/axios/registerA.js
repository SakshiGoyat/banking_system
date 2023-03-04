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
      name: "age",
      message: "Enter your Age: ",
    },
    {
      type: "input",
      name: "gender",
      message: "Enter your gender: ",
    },
    {
      type: "input",
      name: "DOB",
      message: "Enter your DOB(DD/MM/YYYY): ",
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
      type: "input",
      name: "city",
      message: "Enter your city: ",
    },
    {
      type: "input",
      name: "state",
      message: "Enter your state: ",
    },
    {
      type: "input",
      name: "country",
      message: "Enter your country: ",
    },
    {
      type: "password",
      name: "pin",
      message: "Enter your pin: ",
    },
    {
      type: "input",
      name: "bankBalance",
      message: "Enter amount: ",
    },
    {
      type: "input",
      name: "bankName",
      message: "Enter your bank name: ",
    },
    {
      type: "input",
      name: "accountType",
      message: "Enter account type: ",
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

    const passbookArray = [
      `Name : ${answers.name}`,
      `S/ D/ H/ O : ${answers.FatherName}`,
      `CIF Number : ${res.data.CIF}`,
      `A/c Type : ${answers.accountType}`,
      `Address: ${answers.city} ${answers.state} ${answers.country}`,
      `Phone No. : ${answers.PhoneNo}`,
      `Email : ${answers.email}`,
      `-----------------------------------------------------------------`
    ];

    passbookArray.forEach((ele) => {
      fs.appendFile("passbook.txt", ele + '\n', function (err) {
        if (err) throw err;
      });
    });

    // function printPassbook(ele) {
    //   fs.appendFile("passbook.txt", ele, function (err) {
    //     if (err) throw err;
    //   });
    // }

    fs.writeFile("accountNumber.txt", res.data.accountNumber, function (err) {
      if (err) throw err;
    });
    // console.log(answers);

    var passbookRead = fs.readFileSync("passbook.txt", "utf-8");
    console.log(res.data.message);
    console.log(passbookRead);
  }

  //inquirer

  inquirer.prompt(registerQues).then((answers) => {
    registerRequest(answers);
  });
};

// "S/ D/ H/ O : " + answers.FatherName,
// "CIF Number : " + res.data.CIF,
// "A/c Type : " + answers.accountType,
// "Address: " + answers.city + " " + answers.state + " " + answers.country,
// "Phone No. : " + answers.PhoneNo,
// "Email : " + answers.email"

