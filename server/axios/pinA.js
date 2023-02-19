const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");

module.exports = function () {
  //questions
const pinQues = [
  {
    type: "input",
    name: "accountNumber",
    message: "Enter Account Number: ",
  },
  // {
  //   type: "password",
  //   name: "pin",
  //   message: "Enter Current Pin: ",
  // },
  {
    type: "password",
    name: "newPin",
    message: "Enter New Pin: ",
  },
];

  //update pin axios
  async function pinRequest(answers) {
  //   const config = {
  //     method: "post",
  //     url: "http://localhost:5000/pin",
  //     data: answers,
  //   };
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
  //   let res = await axios(config);


    console.log(res.data);
  }

  //inquirer
        inquirer.prompt(pinQues).then((answers) => {
          pinRequest(answers);
        });
};
