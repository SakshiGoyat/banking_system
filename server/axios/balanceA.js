// const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");
const functionality = require("../controllers/functionalities");

module.exports = () => {
  //balance axios
  async function balanceRequest() {
    const userToken = retrieveUserToken();

    let res = await axios.get("http://localhost:5000/balance", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log(res.data, "\n");
    functionality();

  }
  //calling function
  balanceRequest();
};
