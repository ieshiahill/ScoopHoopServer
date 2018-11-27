var express = require("express")
var router = express.Router()
var sequelize = require("../db");
var Games = sequelize.import("../models/games");
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
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

//Post Single Item for User
router.post('/', function (req, res){
        var owner = req.user.id;
        var gamefrequency = req.body.games.gamefrequency;
        // var time = req.body.games.time;
        // var startdate = req.body.games.startdate;
        var venue = req.body.games.venue;
        var address = req.body.games.address;
        var city = req.body.games.city;
        var state = req.body.games.state;
        var zipcode = req.body.games.zipcode;
        var cost = req.body.games.cost;
        var notes = req.body.games.notes;


    Games
        .create({
            owner: owner,
            gamefrequency: gamefrequency,
            // time: time,
            // startdate: startdate,
            venue: venue,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            cost: cost,
            notes: notes
        })
        .then(
            function createSuccess(owner,gamefrequency,venue,address,city,state,zipcode,cost,notes) {
                res.json({
                    owner: owner,
                    gamefrequency: gamefrequency,
                    // time: time,
                    // startdate: startdate,
                    venue: venue,
                    address: address,
                    city: city,
                    state: state,
                    zipcode: zipcode,
                    cost: cost,
                    notes: notes 
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
        
});



//Get single Item for User
router.get('/:id', function(req,res){
    var data = req.params.id;
    var userid = req.user.id;

    Games
    .findOne({
        where: { id: data, owner: userid }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
});

//Delete Item for User
router.delete('/:id', function(req, res) { 
// router.get("/getall" function (req, res) {     - postman testing
    var data = req.params.id;
    var userid = req.user.id;

    Games
    .destroy({
        where: {id: data, owner: userid }
    }).then(
        function deleteGamesSuccess(data){
            res.send("you removed a game");
        },
        function deleteGamesError(err){
            res.send(500, err.message);
        }
    );
});
//Update item for User
router.put('/:id', function(req, res){
// router.get("/getall" function (req, res) {     - postman testing
    var data = req.params.id;
    var gamefrequency = req.body.games.gamefrequency;
    // var time = req.body.games.time;
    // var startdate = req.body.games.startdate;
    var venue = req.body.games.venue;
    var address = req.body.games.address;
    var city = req.body.games.city;
    var state = req.body.games.state;
    var zipcode = req.body.games.zipcode;
    var cost = req.body.games.cost;
    var notes = req.body.games.notes
    
    Games
    .update({
        gamefrequency: gamefrequency,
        // time: time,
        // startdate: startdate,
        venue: venue,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        cost: cost,
        notes: notes
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedGames) {
            res.json({
                updatedGames: updatedGames    
        });
    },
    function updateError(err){
        res.send(500, err.message);
    }
    )
});

module.exports = router;


