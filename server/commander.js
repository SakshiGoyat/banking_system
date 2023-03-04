const { Command } = require("commander");
const program = new Command();
const inquirer = require("inquirer");

// Axios
// const homeAxios = require("./axios/homeA");
const registerAxios = require("./axios/registerA");
const loginAxios = require("./axios/loginA");
const balanceAxios = require("./axios/balanceA");
const withdrawAxios = require("./axios/withdrawA");
const depositAxios = require("./axios/depositA");
const transferAxios = require("./axios/transferA");
const pinAxios = require("./axios/pinA");
const historyAxios = require("./axios/historyA");
const fdAxios = require("./axios/fdA");
const deleteAxios = require("./axios/deleteA");

// choice array
const array = [
  "1. Withdraw",
  "2. Deposit",
  "3. Check balance",
  "4. Change pin",
  "5. Transactions history",
  "6. Fd",
  "7. Delete account"
];

// function to print array
function printArray(value) {
  console.log(value);
}

const homeQues = [
  {
    type: "input",
    name: "value",
    message: "Enter choice (1 or 2....) ",
  },
];

//function to check choice
function checkChoice(answers) {
  // for(let i=1; i<6; i++){
  //   if(answers.value === i.toString()){
  //     console.log("Successful");
  //   }
  // }
  switch (answers.value) {
    case "1":
      withdrawAxios();
      break;

    case "2":
      depositAxios();
      break;

    case "3":
      balanceAxios();
      break;

    case "4":
      pinAxios();
      break;

    case "5":
      historyAxios();
      break;

    case "6":
      fdAxios();
      break;

    case "7":
      deleteAxios();
      break;
  }
}

// home page
program
  .command("bank")
  .alias("bankName")
  .description("home page")
  .action(() => {
    console.log("bank name ");
    array.forEach(printArray);
    inquirer.prompt(homeQues).then((answers) => {
      checkChoice(answers);
    });
  });

// register command
program
  .command("register")
  .alias("r")
  .description("user is registed")
  .action(() => {
    registerAxios();
  });

//login command
program
  .command("login")
  .alias("l")
  .description("user is logged in")
  .action(() => {
    loginAxios();
  });

// check balance command
program
  .command("balance")
  .alias("b")
  .description("balance is printed.")
  .action(() => {
    balanceAxios();
  });

// withdrawal command
program
  .command("withdrawal")
  .alias("w")
  .description("member is removed.")
  .action(() => {
    withdrawAxios();
  });

// deposit members
program
  .command("deposit")
  .alias("d")
  .description("amount is deposited.")
  .action(() => {
    depositAxios();
  });

// transfer amount
program
  .command("transfer")
  .alias("t")
  .description("amount has been transfered.")
  .action(() => {
    transferAxios();
  });

// update pin
program
  .command("pin")
  .alias("p")
  .description("pin has been updated.")
  .action(() => {
    pinAxios();
  });
// history
program
  .command("history")
  .alias("h")
  .description("history is printed.")
  .action((_id) => {
    historyAxios();
  });

//fd
program
  .command("fd")
  .alias("f")
  .description("Make fd")
  .action(() => {
    fdAxios();
  });

//delete
program
  .command("delete")
  .alias("del")
  .description("account is deleted.")
  .action(() => {
    deleteAxios();
  });
program.parse(process.argv);
