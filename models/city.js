module.exports = function (sequelize, DataTypes) {
    return sequelize.define("city", {
        city: {
        type: DataTypes.STRING
    },
})
}