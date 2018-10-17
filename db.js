const Sequelize = require("sequelize"); //Import the Sequelize package.

const sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect: "postgres",
})

sequelize.authenticate().then( //Use the sequelize variable to access methods. Call the authenticate() method. authenticate() returns a promise. Use .then()
    function() { //Fire a function that shows if we're connected.
        console.log("Connected to pickupbasketballapp postgres database");
    },
    function(err){ //Fire an error if there are any errors.
        console.log(err);
    }
);

module.exports = sequelize; //Export the module.