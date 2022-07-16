const expressServer = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = expressServer.Router();

// This will help us connect to the database
const database = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/").get(function (req, res) {
  let db_connect = database.getDb("priceCalculatorDatabase");
  db_connect
    .collection("prices")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/orders").post(function (req, response) {
  let db_connect = dbo.getDb();
  let order = {
    email: req.body.email,
    telephone: req.body.telephone,
    totalPrice: req.body.totalPrice,
  };
  db_connect.collection("orders").insertOne(order, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = recordRoutes;
