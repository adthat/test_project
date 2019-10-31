const errorFunc = require("../errorSupport");
var express = require("express");

const test_user_model = require("../models/test_user");
const user_model = require("../models/users");
var router = express.Router();

/* GET home page. */
router.delete("/:id", async function(req, res, nexr) {
  console.log("delete Request" + req.params.id);
  await test_users_table
    .findByPk(req.params.id) //{ where: { id: req.params.id } })
    .then(result => {
      if (result == null) {
        throwError(
          400,
          "Not found",
          "Could not delete row with id " + req.paramd.id
        );
      }
      test_users_table
        .destroy({ where: { id: req.params.id } })
        .then(result => {
          res.send({ result: "success" });
        });
    })
    .catch(err => {
      res.status(404).send(`Delete : Row with id ${req.params.id} not found`);
    });
});

router.get("/:id", async function(req, res, next) {
  try {
    console.log("Checking " + req.params.id);
    const row = await test_users_table
      .findOne({ where: { id: req.params.id } })
      .then(
        // row => {
        // console.log("Checking row" + row);
        // if (row === null)
        //   throw new Error(`User with Id ${req.params.id} not found`);
        //}
        throwIf(r => !r, 400, "not found", "User not found")
        // ,
        // throwError(500, "sequelize error")
      );
    console.log("Found row with id" + row.id);
    res.status(200).send({ row: row });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/", async function(req, res, next) {
  console.log("Get Request");
  let rows = null;
  try {
    rows = await test_users_table
      .findAll({ raw: true })
      .then(result => {
        if (result !== null) {
          console.log("result not null" + result);
          res.send({ arr: result });
        } else {
          console.log("Result null");
          res.status(200).send("Not available");
        }
      })
      .catch(error => {
        console.log("Error");
        throwError(error.code, "Seq error", error.message);
      });
    console.log("After statement");
  } catch (error) {
    res.status(error.status).send(error.message);
  }

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
const addUser = async (user, res) => {
  console.log("post request --- " + user);
  try {
    const row = await test_users_table.findByPk(user.id).then(r => {
      throwIf(r => !r, 404, "User already exists");
    });

    const newRow = await test_users_table
      .create({
        id: user.id,
        name: user.name,
        address: user.address,
        email: user.email,
        contact_number: "999999",
        date: Date.now()
      })
      .then(result => {
        console.log("Row addition success");
        res.send({ newRow: result });
      })
      .catch(error => {
        throwError(400, "Sequelize Error", "new record not created");
      });
  } catch (error) {
    console.log("Error status" + error.status + "  " + error.message);
    res.status(error.status).send(error.message);
  }
  return res;
};
router.post("/", function(req, res, next) {
  let u = req.body.user;
  console.log("post request - " + u.id);
  return addUser(u, res);
  //res.status(200).json({ add: "user added successfully" });
});
router.put("/", function(req, res, next) {
  var u = req.body.user;
  console.log("post request - " + u.id);
  checkIfRecordExists(u);
  //.console.log(usrArray);
  res.status(200).json({ add: "user added successfully" });
});

module.exports = router;
