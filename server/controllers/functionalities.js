const inquirer = require("inquirer");

module.exports = function () {
  const array = [
    "Select option to proceed: ",
    "1. Withdraw",
    "2. Deposit",
    "3. Check balance",
    "4. Transfer money",
    "5. Change pin",
    "6. Transactions history",
    "7. Fixed deposit",
    "8. Delete account",
    "9. Exit",
  ];

  array.forEach((val) => {
    console.log(val);
  });

  // Question

  const balanceAxios = require("../axios/balanceA");
  const withdrawAxios = require("../axios/withdrawA");
  const depositAxios = require("../axios/depositA");
  const transferAxios = require("../axios/transferA");
  const pinAxios = require("../axios/pinA");
  const historyAxios = require("../axios/historyA");
  const fdAxios = require("../axios/fdA");
  const deleteAxios = require("../axios/deleteA");

  // exit function

  function exit() {
    console.log("Thank you!");
  }
  const question = [
    {
      type: String,
      name: "option",
      message: "Enter choice: ",
    },
  ];

  function checkChoice(answers) {
    switch (answers.option) {
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
        transferAxios();
        break;

      case "5":
        pinAxios();
        break;

      case "6":
        historyAxios();
        break;

      case "7":
        fdAxios();
        break;

      case "8":
        deleteAxios();
        break;

      case "9":
        exit();
        break;
    }
  }
  inquirer.prompt(question).then((ans) => {
    checkChoice(ans);
  });
};
