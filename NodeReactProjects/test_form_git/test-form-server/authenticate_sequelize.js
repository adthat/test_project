const Sequelize = require("sequelize");
console.log("init authenticate_seq");
const path = "mysql://root:sii123@localhost:3306/test_users";
const sequelize = new Sequelize(path, {
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  })
  .finally(() => {
    console.log("Connection closing successfully.");
    //sequelize.close();
  });

module.exports.sequelize = sequelize;
global.sequelize = sequelize;
//module.exports.test_users_table = test_users_table;
