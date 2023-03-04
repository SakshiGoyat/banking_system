const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");

module.exports = function () {
  //Questions
  // const fdChoice = [
  //   // {
  //   //   type: "input",
  //   //   name: "email",
  //   //   message: "Enter your email: ",
  //   // },
  //   {
  //     type: "input",
  //     name: "choice",
  //     message: "Enter fd to check the options: ",
  //   },
  //   // {
  //   //   type: "input",
  //   //   name: "amount",
  //   //   message: "Enter the amount you want to deposit: ",
  //   // },
  // ];

  // const options = [
  //   {
  //     type: "output",
  //     name: "duration",
  //     message: "For 6 months at the interest rate of ____",
  //   },
  //   {
  //     type: "output",
  //     name: "duration",
  //     message: "For 1 year at the interest rate of ____",
  //   },
  //   {
  //     type: "output",
  //     name: "duration",
  //     message: "For 1.5 years at the interest rate of ____",
  //   },
  // ];

  const options = [
    "For 6 months at the interest rate of ____",
    "For 1 year at the interest rate of ____",
    "For 1.5 years at the interest rate of ____",
  ];

  //function to print array
  // function printArray(value){
  //   console.log(value);
  // }

  const chooseOption = [
    {
      type: "input",
      name: "fd",
      message: "Do you want to make fd (yes or y)? "
    }
  ]

  const fdQues = [
    // {
    //   type: "input",
    //   name: "amount",
    //   message: "Enter the time: ",
    // },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount: ",
    },
    // {
    //   type: "input",
    //   name: "amount",
    //   message: "Enter the amount: ",
    // },
  ];

  // deposit axios
  // async function depositRequest(answers) {
    // const config = {
    //   method: "post",
    //   url: "http://localhost:5000/deposit",
    //   data: answers,
    // };
    // const userToken = retrieveUserToken();

  //   let res = await axios.post(
  //     "http://localhost:5000/deposit",
  //     {
  //       data: answers,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     }
  //   );

  //   console.log(res.data);
  // }

  //inquirer
      options.forEach(element => {
        console.log(element);
      });
      inquirer.prompt(chooseOption).then((answers) => {
          if(answers.fd === "yes" || answers.fd === "y"){
            inquirer.prompt(fdQues).then((ans)=>{
              console.log(ans);
            })
          }
        });
}
