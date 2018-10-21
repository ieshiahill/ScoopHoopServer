module.exports = function (sequelize, DataTypes) {
    return sequelize.define("games", {
        owner: DataTypes.INTEGER,
        gamefrequency: DataTypes.STRING,
        time: DataTypes.DATEONLY,
        startdate: DataTypes.DATEONLY,
        venue: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        cost: DataTypes.STRING,
        notes: DataTypes.STRING,

    });
};

