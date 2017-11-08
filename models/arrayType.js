//create table with options and description

module.exports = function(sequelize, DataTypes) {
    var ArrayTypes = sequelize.define("ArrayTypes", {
        Options: DataTypes.INTEGER,
        Description: DataTypes.STRING
    });
    return ArrayTypes;
}