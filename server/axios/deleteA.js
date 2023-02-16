const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function () {
  //Questions
  const deleteQues = [
    {
      type: "input",
      name: "email",
      message: "Enter your email: ",
    },
    {
      type: "input",
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
    const config = {
      method: "post",
      url: "http://localhost:5000/delete",
      data: answers,
    };
    let res = await axios(config);

    console.log(res.data);
  }

  //inquirer
  inquirer.prompt(deleteQues).then((answers) => {
    deleteRequest(answers);
  });
};
