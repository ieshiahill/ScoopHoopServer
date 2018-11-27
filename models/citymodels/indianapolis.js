module.exports = function (sequelize, DataTypes) {
    return sequelize.define("indianapolis", {
        city: DataTypes.STRING,
    });
}