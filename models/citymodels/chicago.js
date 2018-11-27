module.exports = function (sequelize, DataTypes) {
    return sequelize.define("chicago", {
        city: DataTypes.STRING,
    });
}