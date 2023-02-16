const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function () {
  //Question
  const loginQues = [
    {
      type: "input",
      name: "email",
      message: "Enter your Email: ",
    },
    {
      type: "input",
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

    console.log(res.data);
  }

  //inquirer
  inquirer.prompt(loginQues).then((answers) => {
    loginRequest(answers);
  });
};
