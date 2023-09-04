const fs = require("fs");

module.exports = (data) => {
  let stringifiedData = JSON.stringify(data, null, 2);
  return fs.writeFileSync("./models/usersData.json", stringifiedData);
};
