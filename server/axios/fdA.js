const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");
const fs = require("fs");
module.exports = function () {
  //Questions
  fdChooses = ["1. Make fd", "2. Withdraw fd"];

  // choose options question
  const chooseOption = [
    {
      type: "input",
      name: "fd",
      message: "Enter option: ",
    },
  ];
  //make fd questions
  const fdQues = [
    {
      type: "input",
      name: "option",
      message: "Enter option: ",
    },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount: ",
    },
    {
      type: "input",
      name: "nomine",
      message: "Nomine name: ",
    },
  ];

  //withdrawal fd question
  const withdFd = [
    {
      type: "input",
      name: "account",
      message: "Enter account Number: ",
    },
    {
      type: "input",
      name: "token",
      message: "Enter token: ",
    },
  ];

  // withdraw fd request

  async function withdFdRequest(ans) {
    const userToken = retrieveUserToken();

    let res = await axios.post(
      "http://localhost:5000/fdWithdraw",
      {
        data: ans,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(res.data);
  }

  // make fd axios
  async function fdRequest(answers) {
    const userToken = retrieveUserToken();

    let res = await axios.post(
      "http://localhost:5000/fd",
      {
        data: answers,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    fdPassbook = `
----------------------------------------------------------------
                    | Bank of Origin |
                     ----------------
    Name: ${res.data.newFd.name}
    Account Number: ${res.data.newFd.accountNumber}
    Token: ${res.data.newFd.token}
    Amount: ${res.data.newFd.amount},
    Interest Rate: ${res.data.newFd.interest}
    Minimum time: ${res.data.newFd.min}
    Maximum time: ${res.data.newFd.max}
    Fd Date: ${res.data.newFd.fdDate}
    Nomine: ${res.data.newFd.nomine}
-----------------------------------------------------------------
    `;

    fs.writeFile("fdPassbook.txt", fdPassbook, function (err) {
      if (err) throw err;
    });

    const readFdFile = await fs.readFileSync("fdPassbook.txt", "utf-8");

    console.log(res.data.message);
    console.log(readFdFile);
  }

  //inquirer
  const fdOptions = fs.readFileSync("fdChooses.txt", "utf-8");
  fdChooses.forEach((element) => {
    console.log(element);
  });

  inquirer.prompt(chooseOption).then((answer) => {
    if (answer.fd === "1") {
      console.log(fdOptions);
      inquirer.prompt(fdQues).then((ans) => {
        fdRequest(ans);
        // console.log(ans);
      });
    }
    if (answer.fd === "2") {
      inquirer.prompt(withdFd).then((ans) => {
        withdFdRequest(ans);
      });
    }
  });
};
