var express = require("express");

const test_user_model = require("../models/test_user");
var router = express.Router();

/* GET home page. */
router.delete("/", function(req, res, nexr) {
  console.log("delete Request" + req.id);
});
router.get("/:id", async function(req, res, next) {
  await test_users_table.findOne({ id: req.body.id }).then(row => {
    console.log("Found row with id" + row.id);
    res.send({ row: row });
  });
});
router.get("/", async function(req, res, next) {
  console.log("Get Request");
  let rows = null;
  rows = await getAllRecords()
    .then(rows => {
      // if (rows !== null) {
      console.log("rows not null" + rows);
      res.send({ arr: rows });
    })
    .catch(console.log("ERRR"));

  // res.render("index", { arr: usrArray });
});
const errHandler = err => {
  console.error("Error:", err);
};
const getAllRecords = async () => {
  let rows = null;
  return await test_users_table.findAll({ raw: true });
};
const checkIfRecordExists = async u => {
  console.log("checkIfRecordExists");
  let rows = null;
  await test_users_table
    .findByPk(u.id)
    .then(async rows => {
      if (rows == null) {
        console.log("no record found");
        await test_users_table
          .create({
            id: u.id,
            name: u.name,
            address: u.address,
            email: u.email,
            contact_number: "999999",
            date: Date.now()
          })
          .then(console.log("new record created"))
          .catch(errHandler);
      } else {
        console.log("new record check by id" + rows.id);
        await rows
          .update({
            id: u.id,
            name: u.name,
            address: u.address,
            email: u.email,
            contact_number: "999999",
            date: Date.now()
          })
          .then(console.log("row updated"))
          .catch(errHandler);
      }
    })

    .catch(errHandler);
};
router.post("/", function(req, res, next) {
  var u = req.body.user;
  console.log("post request - " + u.id);
  checkIfRecordExists(u);
  //.console.log(usrArray);
  res.status(200).json({ add: "user added successfully" });
});

module.exports = router;
