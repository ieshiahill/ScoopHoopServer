var express = require("express")
var router = express.Router()
var sequelize = require("../db");
var Games = sequelize.import("../models/games");
// Games.sync({ force: true })
router.post("/creategames", function (req, res) {
    Games.create({ 
        gamefrequency: req.body.frequency,
        time: Date.now(),
        startdate: Date.now(),
        venue: req.body.venue,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        cost: req.body.cost,
        notes: req.body.notes
    })
    .then(
        function message(info) {
            res.send(info);
        }
    )
});

router.get("/find", function (req, res) {
    Games.findAll().then(
        function (games) {
            res.json(games)
        }
    )

})

module.exports = router; 