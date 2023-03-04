const inquirer = require("inquirer");
const axios = require("axios");

const array = ["1. Withdraw", "2. Deposit", "3. Check balance", "4. Change pin", "5. Transactions history", "6. Fd"];

function printArray(value){
  console.log(value);
}
module.exports = function (){
    // const homeQues = [
    //   {
    //     type: "output",
    //     name: "options",
    //     message: "Withdraw ",
    //   },
    // ];
  console.log("bank name ");
  array.forEach(printArray);
    // inquirer.prompt(array.forEach(printArray)).then(()=>{
    //   console.log("home page successful.");
    // })
}