const Sequelize = require("sequelize");
console.log("init test_user");
module.exports = test_users_table = sequelize.define("test_users", {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  date: Sequelize.DATE,
  email: Sequelize.STRING,
  contact_number: Sequelize.STRING
});

// test_users_table
//   .sync()
//   .then(() => {
//     console.log("New table created");
//   })
//   .finally(() => {
//     //sequelize.close();
//   });
