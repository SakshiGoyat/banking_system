const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const functionality = require("../controllers/functionalities");

module.exports = function () {
  //Question
  const loginQues = [
    {
      type: "input",
      name: "email",
      message: "Enter your Email: ",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your Password: ",
    },
    {
      type: "input",
      name: "accountNumber",
      message: "Enter your Account Number: ",
    },
  ];

  // login axios
  async function loginRequest(answers) {
    const config = {
      method: "post",
      url: "http://localhost:5000/login",
      data: answers,
    };

    let res = await axios(config);
    fs.writeFile("token.txt", res.data.token, function (err) {
      if (err) throw err;
    });
    console.log(res.data.message);
    if (res.data.success === "true") {
      functionality();
    }
  }

  
  //inquirer
  inquirer.prompt(loginQues).then((answers) => {
    loginRequest(answers);
  });
};
