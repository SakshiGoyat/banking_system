const fs = require("fs");
module.exports = () => {
  var token = fs.readFileSync("token.txt", "utf8");
  return token;
};
