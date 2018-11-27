var express = require("express")
var router = express.Router()
var sequelize = require("../db");
var Games = sequelize.import("../citymodels/chicago");
// Games.sync({ force: true })

//Get All Items for User
router.get('/', function (req, res){
// router.get("/getall" function (req, res) {     - postman testing
    var userid = req.user.id;

    Games
        .findAll({
            where: { owner: userid }
        })
        .then(
            function findAllSuccess(chicago) {
                res.json(chicago);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

module.exports = router;