require("dotenv").config();

var express = require("express"); 
var app = express(); 
var user = require("./controllers/usercontroller"); 
var sequelize = require("./db"); 
var bodyParser = require("body-parser");
var games = require("./controllers/gamescontroller");


sequelize.sync(); 
app.use(bodyParser.json());
app.use(require("./middleware/headers"));
//exposed routes
app.use("/user", user); 

//protected routes
app.use(require("./middleware/validate-session")); 
app.use("/games", games);
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})
;