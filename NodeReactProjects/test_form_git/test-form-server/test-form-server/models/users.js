const Sequelize = require("sequelize");
console.log("init user");
module.exports = users_table = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  role: Sequelize.INTEGER(11)
});

// test_users_table
//   .sync()
//   .then(() => {
//     console.log("New table created");
//   })
//   .finally(() => {
//     //sequelize.close();
//   });
