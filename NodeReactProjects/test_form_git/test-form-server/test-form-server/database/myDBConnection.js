var mysql = require("mysql");

class DBConnection {
  constructor(host, user, password, database) {
    this.connection = null;
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
  }
  connect() {
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });
    this.connection.connect();
  }
  doQuery() {
    this.connection.query("select * from test_users", function(
      err,
      rows,
      fields
    ) {
      if (err) throw err;

      console.log("The solution is: total records: ", rows);
    });
  }
  closeConnection() {
    this.connection.end();
  }
}
module.exports = DBConnection;
