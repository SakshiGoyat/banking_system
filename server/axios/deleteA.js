const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");

module.exports = function () {
  //Questions
  const deleteQues = [
    {
      type: "input",
      name: "email",
      message: "Enter your email: ",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password: ",
    },
    {
      type: "input",
      name: "accountNumber",
      message: "Enter your account number: ",
    },
  ];

  // delete axios
  async function deleteRequest(answers) {
    const userToken = retrieveUserToken();
    let res = await axios.post(
      "http://localhost:5000/delete",
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
  inquirer.prompt(deleteQues).then((answers) => {
    deleteRequest(answers);
  });
};
