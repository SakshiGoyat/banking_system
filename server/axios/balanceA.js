const inquirer = require("inquirer");
const axios = require("axios");

module.exports = () => {

//balance axios
  async function balanceRequest() {
    const config = {
      method: "get",
      url: "http://localhost:5000/balance",
    };

    let res = await axios(config);

    console.log(res.data);
  }
  //calling function
  balanceRequest();
};
