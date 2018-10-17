const Sequelize = require("sequelize"); //Import the Sequelize package.

const sequelize = new Sequelize("pickupbasketballapp", "postgres", "PostgresBasketball1988$", { //Create an instance of Sequelize for use in the module with the sequelize variable. Use the constructor to create a new Sequelize object. Identify the db table to connect to. The username for the db. The password for the local db.
    host: "localhost", //The host points to the local port for Sequelize. This is 5432.
    dialect: "postgres" //Identify the QL dialect being used. Could be MSSQL, SQLLite, or others
});

sequelize.authenticate().then( //Use the sequelize variable to access methods. Call the authenticate() method. authenticate() returns a promise. Use .then()
    function() { //Fire a function that shows if we're connected.
        console.log("Connected to pickupbasketballapp postgres database");
    },
    function(err){ //Fire an error if there are any errors.
        console.log(err);
    }
);

module.exports = sequelize; //Export the module.