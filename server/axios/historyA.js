const inquirer = require("inquirer");
const axios = require("axios");
const retrieveUserToken = require("../utility/retrieveUserToken");

module.exports = function () {
  //history axios
  async function historyRequest() {
    // const config = {
    //   method: "get",
    //   url: "http://localhost:5000/history",
    // };

    // let res = await axios(config);
const userToken = retrieveUserToken();

let res = await axios.get(
  "http://localhost:5000/history",
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
);
    console.log(res.data);
  }

  //inquirer
  historyRequest();
};
