const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function () {
  //Questions
  const transferQues = [
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
    // {
    //   type: "input",
    //   name: "recEmail",
    //   message: "Enter reciever email: ",
    // },
    {
      type: "input",
      name: "accountNumber",
      message: "Enter account Number to whom you want to transfer the money : ",
    },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount you want to transfer: ",
    },
  ];

  // transfer axios
  async function transferRequest(answers) {
    const config = {
      method: "post",
      url: "http://localhost:5000/transfer",
      data: answers,
    };
    let res = await axios(config);

    console.log(res.data);
  }

  //inquirer
  inquirer.prompt(transferQues).then((answers) => {
    transferRequest(answers);
  });
};
