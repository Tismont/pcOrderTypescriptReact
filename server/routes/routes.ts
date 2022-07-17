const expressServer = require("express");

const routes = expressServer.Router();

const database = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

routes.route("/prices").get(function (req, res) {
  let db_connect = database.getDb("priceCalculatorDatabase");
  db_connect
    .collection("prices")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

routes.route("/orders").post(function (req, response) {
  let db_connect = database.getDb();
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

module.exports = routes;
