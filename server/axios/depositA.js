const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function () {
  //Questions
  const depositQues = [
    // {
    //   type: "input",
    //   name: "email",
    //   message: "Enter your email: ",
    // },
    {
      type: "input",
      name: "pin",
      message: "Enter your pin: ",
    },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount you want to deposit: ",
    },
  ];

  // deposit axios
  async function depositRequest(answers) {
    const config = {
      method: "post",
      url: "http://localhost:5000/deposit",
      data: answers,
    };
    let res = await axios(config);

    console.log(res.data);
  }

  //inquirer
      inquirer.prompt(depositQues).then((answers) => {
        depositRequest(answers);
      });
};
