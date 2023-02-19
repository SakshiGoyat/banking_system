const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");

module.exports = function () {
  //Questions
  const transferQues = [
    // {
    //   type: "input",
    //   name: "email",
    //   message: "Enter your email: ",
    // },
    {
      type: "password",
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
    const userToken = retrieveUserToken();

    let res = await axios.post(
      "http://localhost:5000/transfer",
      {
        data: answers,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(res.data);
  }

  //inquirer
  inquirer.prompt(transferQues).then((answers) => {
    transferRequest(answers);
  });
};
