const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function(){

    //Questions
  const withdrawalQues = [
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
      message: "Enter the amount you want to withdraw: ",
    },
  ];

  // withdrawal axios
  async function withdrawalRequest(answers) {
    const config = {
      method: "post",
      url: "http://localhost:5000/withdrawal",
      data: answers,
    };

    let res = await axios(config);

    console.log(res.data);
  }

  //inquirer
  inquirer.prompt(withdrawalQues).then((answers) => {
    withdrawalRequest(answers);
  });
}