const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");
const functionality = require("../controllers/functionalities");

module.exports = function () {
  //Questions
  const withdrawalQues = [
    {
      type: "password",
      name: "pin",
      message: "Enter your pin: ",
    },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount you want to withdraw: ",
    },
  ];

  // withdrawal axios
  async function withdrawalRequest(answers) {
    const userToken = retrieveUserToken();

    let res = await axios.post(
      "http://localhost:5000/withdrawal",
      {
        data: answers,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (res.data.success === true) {
      console.log(res.data.message, "\n");
      functionality();
    } else {
      console.log(res.data.error, "\n");
    }
  }

  //inquirer
  inquirer.prompt(withdrawalQues).then((answers) => {
    withdrawalRequest(answers);
  });
};
