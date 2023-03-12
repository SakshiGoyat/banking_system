const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");
const functionality = require("../controllers/functionalities");

module.exports = function () {
  //questions
  const pinQues = [
    {
      type: "input",
      name: "accountNumber",
      message: "Enter Account Number: ",
    },
    {
      type: "password",
      name: "newPin",
      message: "Enter New Pin: ",
    },
  ];

  //update pin axios
  async function pinRequest(answers) {
    const userToken = retrieveUserToken();

    let res = await axios.post(
      "http://localhost:5000/pin",
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
    }else{
      console.log(res.data.error);
    }
  }

  //inquirer
  inquirer.prompt(pinQues).then((answers) => {
    pinRequest(answers);
  });
};
