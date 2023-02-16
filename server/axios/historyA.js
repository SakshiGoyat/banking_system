const inquirer = require("inquirer");
const axios = require("axios");

module.exports = function () {
  //history axios
  async function historyRequest() {
    const config = {
      method: "get",
      url: "http://localhost:5000/history",
    };

    let res = await axios(config);

    console.log(res.data);
  }

  //inquirer
  historyRequest();
};
