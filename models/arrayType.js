//create table with options and description

module.exports = function(sequelize, DataTypes) {
    var Mounts = sequelize.define("Mounts", {
        Options: DataTypes.INTEGER,
        Description: DataTypes.STRING
    });
    return Mounts;
};