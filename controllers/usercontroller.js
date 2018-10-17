var express = require("express")
var router = express.Router()
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken"); 

router.post("/createuser", function (req, res) {

    var username = req.body.user.username;
    var pass = req.body.user.password;
    // var email = "thedude@gmail.com";
    // var city = "Indianapolis";

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
        // email: email,
        // city: city,

    }).then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: "created", //Along with the user object that gets returned as JSON, we can send a message in the response.
                sessionToken: token
            });
    },
    function createError(err) {
        res.send(500, err.message);
    }
);
});   

router.post("/signin", function(req, res) { //We're sending data this time, so we use router.post instead of router.get
    User.findOne( { where: { username: req.body.user.username} } ).then( //The findOne() method is a Sequelize method that does exactly what it says: it tries to find something within the database that we tell it to look for. This is called Data Retrieval. where is an object within Sequelize that tells the database to look for something matching its properties. We're looking in the username column in the user table for one thing that matches the value passed from the client. The promise is handled within the .then() function.
       
    function(user) { //Here we have a function that is called when the promise is resolved, and if successful, sends the user object back in the response.
        if (user) { //First we check to make sure that a match for the username was found.
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) { //Before, we used bcrypt to encrypt the password. Now, we use it to decrypt the hash value and compare it to the supplied password. Here we pull in the password value from the current request when the user is signing up. This pulls the hashed password value from the database. Run a callback function that will run on either success or failure of compare.
                // console.log("The value matches:", matches); //If the hashed password in the database matches the one that has been entered, print to the console that the password values match. Note that the matches variable is a boolean.
            if (matches) { //Here we use the callback function from the compare() method. If the username and password are a match, this will be set to true, and the expression in the conditional will execute.
                var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 }); //Upon success, we will create a new token for the session. Note that this code uses the same jwt.sign method that we used upon sign up. We will let you review that code if you need clarification.
                res.json({ //We return the user object with a success message and sessionToken.
                    user: user,
                    message: "successfully authenticated",
                    sessionToken: token
                });
        } else { //If the passwords don't match or the username is not correct, we send a response telling the client that authentication did not occur.
            res.status(502).send({ error: "Please enter valid login credentials." }); //Function called if the promise is rejected. We print the error to the console. 
        }
    });
} else {
    res.status(500).send({ error: "failed to authenticate" });
    }
},
    function (err) {
        res.status(501).send({ error: "You failed, yo"});
        }
    );
});

module.exports = router;