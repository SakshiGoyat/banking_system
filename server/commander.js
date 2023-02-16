const { Command } = require("commander");
const program = new Command();

// Axios
const registerAxios = require("./axios/registerA");
const loginAxios = require("./axios/loginA");
const balanceAxios = require("./axios/balanceA");
const withdrawAxios = require("./axios/withdrawA");
const depositAxios = require("./axios/depositA");
const transferAxios = require("./axios/transferA");
const pinAxios = require("./axios/pinA");
const historyAxios = require("./axios/historyA");
const deleteAxios = require("./axios/deleteA");

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

// delete
program
  .command("delete")
  .alias("del")
  .description("account is deleted.")
  .action(() => {
    deleteAxios();
  });

program.parse(process.argv);
