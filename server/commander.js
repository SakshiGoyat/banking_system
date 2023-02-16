const { Command } = require("commander");
const inquirer = require("inquirer");
const axios = require("axios");

const program = new Command();

// Questions
const registerQues = [
  {
    type: "input",
    name: "name",
    message: "Enter your name: ",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email ID: ",
  },
  {
    type: "input",
    name: "password",
    message: "Enter your password: ",
  },
  {
    type: "input",
    name: "cPassword",
    message: "Enter your confirm password: ",
  },
  {
    type: "input",
    name: "aadhaarCard",
    message: "Enter your Aadhar number: ",
  },
  {
    type: "input",
    name: "PANCard",
    message: "Enter your PAN number: ",
  },
  {
    type: "input",
    name: "PhoneNo",
    message: "Enter your phone number: ",
  },
  {
    type: "input",
    name: "FatherName",
    message: "Enter your Father's name: ",
  },
    {
    type: "input",
    name: "pin",
    message: "Enter your pin: ",
  },
  {
    type: "input",
    name: "address",
    message: "Enter your address: ",
  },
      {
    type: "input",
    name: "bankBalance",
    message: "Enter your bank balance: ",
  },
];

const loginQues = [
  {
    type: "input",
    name: "email",
    message: "Enter your Email: ",
  },
  {
    type: "input",
    name: "password",
    message: "Enter your Password: ",
  },
  {
    type: "input",
    name: "accountNumber",
    message: "Enter your Account Number: ",
  },
];

// const balanceQues = [
//   {
//     type: "input",
//     name: "email",
//     message: "Enter your email: ",
//   },
//   {
//     type: "input",
//     name: "pin",
//     message: "Enter your pin: ",
//   }
// ]

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
  }
];

const depositQues = [
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
    message: "Enter the amount you want to deposit: ",
  },
];
const transferQues = [
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
  // {
  //   type: "input",
  //   name: "recEmail",
  //   message: "Enter reciever email: ",
  // },
  {
    type: "input",
    name: "accountNumber",
    message: "Enter your account Number: ",
  },
  {
    type: "input",
    name: "amount",
    message: "Enter the amount you want to transfer: ",
  },
];

const pinQues = [
  {
    type: "input",
    name: "accountNumber",
    message: "Enter your Account Number: ",
  },
  {
    type: "input",
    name: "pin",
    message: "Enter your previous pin: ",
  },
  {
    type: "input",
    name: "newPin",
    message: "Enter your new pin: ",
  },
];
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

// testing
program.version("2.0.0").description("Banking System project");

// register axios
async function registerRequest(answers) {
  const config = {
    method: "post",
    url: "http://localhost:5000/register",
    data: answers
  };

  let res = await axios(config);

  console.log(res.data);
}

// login axios
async function loginRequest(answers){
  const config = {
    method: "post",
    url: "http://localhost:5000/login",
    data: answers
  };

  let res = await axios(config);

  console.log(res.data);
}

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

// balance axios
async function balanceRequest() {
  const config = {
    method: "get",
    url: "http://localhost:5000/balance",
    // data: answers,
  };

  let res = await axios(config);

  console.log(res.data);
}

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

// deposit axios
async function depositRequest(answers) {
  const config = {
    method: "post",
    url: "http://localhost:5000/deposit",
    data: answers,
  };
  let res = await axios(config);

  console.log(res.data);
}

// transfer axios
async function transferRequest(answers) {
  const config = {
    method: "post",
    url: "http://localhost:5000/transfer",
    data: answers,
  };
  let res = await axios(config);

  console.log(res.data);
}

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

//history
async function historyRequest() {
  const config = {
    method: "get",
    url: "http://localhost:5000/history",
    // data: answers,
  };

  let res = await axios(config);

  console.log(res.data);
}
// register command
program
  .command("register")
  .alias("r")
  .description("user is registed")
  .action(() => {
    // inquirer.prompt(Questions).then((answers) => addMember(answers));

    inquirer.prompt(registerQues).then((answers) => {
      registerRequest(answers);
    });
  });

//login command
program
  .command("login")
  .alias("l")
  .description("user is logged in")
  .action(() => {
  inquirer.prompt(loginQues).then((answers) => {
    loginRequest(answers);
});
  });

// update pin

program
  .command("pin")
  .alias("p")
  .description("pin has been updated.")
  .action(() => {
    inquirer.prompt(pinQues).then((answers) => {
      pinRequest(answers);
    });
  });
// check balance command
program
  .command("balance")
  .alias("b")
  .description("balance is printed.")
  .action((_id) => {
    // inquirer.prompt(balanceQues).then((answers) => {
      // balanceRequest(answers);
      balanceRequest();
    // });
  });

// withdrawal command
program
  .command("withdrawal")
  .alias("w")
  .description("member is removed.")
  .action(() => {
    inquirer.prompt(withdrawalQues).then((answers) => {
      withdrawalRequest(answers);
    });
  });

// deposit members
program
  .command("deposit")
  .alias("d")
  .description("amount is deposited.")
  .action(() => {
    inquirer.prompt(depositQues).then((answers) => {
      depositRequest(answers);
    });
  });

// transfer amount
program
  .command("transfer")
  .alias("t")
  .description("amount has been transfered.")
  .action(() => {
    inquirer.prompt(transferQues).then((answers) => {
      transferRequest(answers);
    });
  });

// history
program
  .command("history")
  .alias("h")
  .description("history is printed.")
  .action((_id) => {
    // inquirer.prompt(balanceQues).then((answers) => {
    // balanceRequest(answers);
    historyRequest();
    // });
  });
  // delete
program
  .command("delete")
  .alias("del")
  .description("account is deleted.")
  .action(() => {
    inquirer.prompt(deleteQues).then((answers) => {
      deleteRequest(answers);
    });
  });

program.parse(process.argv);

