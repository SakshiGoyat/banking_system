const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");
const functionality = require("../controllers/functionalities");

module.exports = function () {
  //Questions
  const transferQues = [
    {
      type: "password",
      name: "pin",
      message: "Enter your pin: ",
    },
    {
      type: "input",
      name: "accountNumber",
      message: "Enter receiver's account Number: ",
    },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount: ",
    },
    {
      type: "input",
      name: "bankName",
      message: "Enter the receiver's bank name (in lowercase only): ",
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

    console.log(res.data.message, "\n");
    functionality();

  }

  //inquirer
  inquirer.prompt(transferQues).then((answers) => {
    transferRequest(answers);
  });
};
