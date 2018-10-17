var express = require("express")
var router = express.Router()
var sequelize = require("../db");
var City = sequelize.import("../models/city");

router.post("/city", function (req, res) {

})

module.exports = router; 