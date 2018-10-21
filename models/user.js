module.exports = function (sequelize, DataTypes) {
    return sequelize.define("user", {
        username: {type: DataTypes.STRING, unique: true},
        passwordhash: DataTypes.STRING
    });
};







//     return sequelize.define ("user", { // A function with a Sequelize object that calls the define method. A first parameter that will create a "users" table in Postgres. 
//         username: {
//         type: DataTypes.STRING, //An object with username and passwordhash that will be the columns in the table. We'll talk more about a passwordhash later.
//         allowNull: false
//         },

//         email: {
//         type: DataTypes.STRING,
//         // allowNull: false,
//         unique: true
//         },

//         passwordhash: {
//         type: DataTypes.STRING, //An object with username and passwordhash that will be the columns in the table. We'll talk more about a passwordhash later.
//         allowNull: false
//         },

//         city: {
//         type:DataTypes.STRING,
//         },
//     })
// }