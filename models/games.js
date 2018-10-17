module.exports = function (sequelize, DataTypes) {
    return sequelize.define("games", {
        gamefrequency: DataTypes.STRING,
        time: DataTypes.DATE,
        startdate: DataTypes.DATE,
        venue: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        cost: DataTypes.STRING,
        notes: DataTypes.STRING,

    });
};

