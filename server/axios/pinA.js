const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function () {
  //questions
  inquirer.prompt(transferQues).then((answers) => {
    transferRequest(answers);
  });

  //update pin axios
  async function pinRequest(answers) {
    const config = {
      method: "post",
      url: "http://localhost:5000/pin",
      data: answers,
    };

    let res = await axios(config);

    console.log(res.data);
  }

  //inquirer
        inquirer.prompt(pinQues).then((answers) => {
          pinRequest(answers);
        });
};
