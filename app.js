require("dotenv").config();

var express = require("express"); //Here we require the use of the express npm package that we've installed in our dependencies. 
var app = express(); //We create an instance of express. We're actually firing off a top-level express() function, a function exported by the Express module. This allows us to create an Express app. 
var user = require("./controllers/usercontroller"); //We import the usercontroller.js file.
var games = require("./controllers/gamescontroller");
var sequelize = require("./db"); //Create a sequelize variable that imports the db file. 2. Use the variable and call .sync().
var bodyParser = require("body-parser");

sequelize.sync(); //Use the variable and call .sync(). This method will ensure that we sync all defined models to the DB.
app.use(bodyParser.json()); //This app.use statement MUST go above any routes. Any routes above this statement will not be able to use the bodyparser library, so they will break. 
app.use(require("./middleware/headers"));


app.use("/user", user); //We set up a route to the endpoints for the /user route.

app.use("/games", games);

app.use(require("./middleware/validate-session")); //We imported the validate-session middleware, which will check to see if the incoming request has a token. 

app.listen(3000, function(){ //app.listen will use express to start a UNIX socket and listen for connections on the given path. This method is identical to Node’s http.Server.listen() // The given path is localhost:3000
    console.log("App is listening on 3008.") //We call a callback function when the connection happens with a simple console.log
});