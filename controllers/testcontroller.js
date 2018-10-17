var express = require("express"); //We import the Express framework and it inside the variable express. This instance becomes our gateway to using Express methods.
var router = express.Router(); // We create a new variable called router. Since the express variable(line 1) gives us access into the express framework, we can access express properties and methods by calling express + .. Therefore, when we call express.Router(), we are using the express variable to access the Router() method.The Router() method will return a router object for us. 
var sequelize = require("../db");
var TestModel = sequelize.import("../models/test"); //We import the test model and store it in TestModel variable. It is convention to use Pascal casing (uppercase on both words) for a model class with Sequelize. You'll find this to be true in other programming languages as well.
// router.get("/", function (req, res) { //We use the router object by using the router variable to get access into the Router() object methods. get() is one of the methods in the object, and we call it here. This method allows us to complete an HTTP GET request. We pass two arguments into the .get method.
//     res.send("Hey! This is a test route!");
// });

router.post("/one", function (req, res){
    res.send("Test 1 went through!")
});

router.post("/two", function (req, res) {
    let testData = "Test data for endpoint two"; //testData is going to have a fixed string that we'll use every time a POST request comes in.

    TestModel //We use the TestModel variable to access the model that we are using. This will grant us access to the Test model properties and to Sequelize methods.
    .create({ //.create() is a Sequelize method that allows us to create an instance of the Test model and send it off to the db, as long as the data types match the model.
        testdata: testData //testdata is the key in the object, and it represents the column being used in the table. We pass the value of testData down to satisfy the key/value pair for the model. The string that we are sending will be the value that's stored in the variable. Currently, it is the string Test data for endpoint two;

    }).then(dataFromDatabase => {
        res.send("Test two went through!")
    })
});

router.post("/three", function (req, res) {
    var testData = req.body.testdata.item; //Here we use the req.body middleware provided by Express and append two more properties to it. This is what we're sending to the database. req is the actual request, and body is where our data is being held. testdata is a property of body, while item is a property of testdata. We'll see this in Postman in a little while.

    TestModel
    .create({ //create() is a Sequelize method. It creates a SQL statement that will insert our data into the database.
        testdata: testData
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

router.post("/four", function (req, res) {
    var testData = req.body.testdata.item;
    TestModel 
    .create({
        testdata: testData
    })
    .then( //We call the then() method. As you'll read in the the MDN docs, the then() method returns a Promise. Hence, we use this asynchronous function to force the message to wait for the insert statement to finish
        function message() { // The callback function will print the success message to the console once testData is done running.
            res.send("Test 4 went through!");
        }
    );
});

module.exports = router;

//the controller sends the response to postman 