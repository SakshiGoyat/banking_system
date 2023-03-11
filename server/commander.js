#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const inquirer = require("inquirer");
const cfonts = require("cfonts");

// Axios
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

// choice 1
const array = ["1. New account", "2. Already have account"];

const homeQues = [
  {
    type: "input",
    name: "value",
    message: "Enter choice (1 or 2) ",
  },
];

//function to check choice
function checkChoice(answer) {
  if (answer.value === "1") {
    registerAxios();
  } else {
    loginAxios();
  }
}

cfonts.say("Welcome!", {
  font: "chrome", // define the font face
  align: "center", // define text alignment
  colors: ["system"], // define all colors
  background: "transparent", // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: false, // define if this is a transition between colors directly
  env: "node", // define the environment cfonts is being executed in
});

cfonts.say("Bank of Origin", {
  font: "block", // define the font face
  align: "center", // define text alignment
  colors: ["system"], // define all colors
  background: "transparent", // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: false, // define if this is a transition between colors directly
  env: "node", // define the environment cfonts is being executed in
});

cfonts.say("The Changing Face of Prosperity", {
  font: "chrome", // define the font face
  align: "center", // define text alignment
  colors: ["system"], // define all colors
  background: "transparent", // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: false, // define if this is a transition between colors directly
  env: "node", // define the environment cfonts is being executed in
});
// home page
program
  .command("start")
  .alias("s")
  .description("home page")
  .action(() => {
    array.forEach((value) => {
      console.log(value);
    });
    inquirer.prompt(homeQues).then((answers) => {
      checkChoice(answers);
    });
  });

// register command
program
  .command("register")
  .alias("r")
  .description("User has been registed")
  .action(() => {
    registerAxios();
  });

//login command
program
  .command("login")
  .alias("l")
  .description("User has been logged in")
  .action(() => {
    loginAxios();
  });

// check balance command
program
  .command("balance")
  .alias("b")
  .description("Bank balance is printed.")
  .action(() => {
    balanceAxios();
  });

// withdrawal command
program
  .command("withdrawal")
  .alias("w")
  .description("Given amount has been withdrawaled.")
  .action(() => {
    withdrawAxios();
  });

// deposit members
program
  .command("deposit")
  .alias("d")
  .description("Amount is deposited.")
  .action(() => {
    depositAxios();
  });

// transfer amount
program
  .command("transfer")
  .alias("t")
  .description("Amount has been transfered.")
  .action(() => {
    transferAxios();
  });

// update pin
program
  .command("pin")
  .alias("p")
  .description("Pin has been updated.")
  .action(() => {
    pinAxios();
  });
// history
program
  .command("history")
  .alias("h")
  .description("History is printed.")
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
  .description("Account is deleted.")
  .action(() => {
    deleteAxios();
  });
program.parse(process.argv);
