// const axios = require("axios");

// async function getdata(){
// let res = await axios.get("http://webcode.me");
//   let data = res.data;
//   console.log(data);
// }

// getdata();

// const axios = require("axios");

// axios.get("http://webcode.me").then((resp) => {
//   console.log(resp.data);
// });

// const axios = require("axios");

// async function doGetRequest() {
//   let res = await axios.get("http://webcode.me");

//   let data = res.data;
//   console.log(data);
// }

// doGetRequest();

const axios = require("axios");

async function makeRequest() {
  const config = {
    method: "get",
    url: "http://webcode.me",
  };

  let res = await axios(config);

  console.log(res.status);
}

makeRequest();