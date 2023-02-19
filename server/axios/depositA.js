const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");

module.exports = function () {
  //Questions
  const depositQues = [
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
    {
      type: "input",
      name: "amount",
      message: "Enter the amount you want to deposit: ",
    },
  ];

  // deposit axios
  async function depositRequest(answers) {
    // const config = {
    //   method: "post",
    //   url: "http://localhost:5000/deposit",
    //   data: answers,
    // };
    const userToken = retrieveUserToken();

    let res = await axios.post(
      "http://localhost:5000/deposit",
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
  inquirer.prompt(depositQues).then((answers) => {
    depositRequest(answers);
  });
};
