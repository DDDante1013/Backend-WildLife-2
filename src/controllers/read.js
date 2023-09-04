const fs = require("fs");

const read = () =>
  JSON.parse(fs.readFileSync("./models/usersData.json", "utf-8"));
  
module.exports = read;
