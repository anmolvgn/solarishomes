
// var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      username: {
          type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              len: [6, 22]
          }
      }     
    });
    Users.associate = function(models) {
        Users.hasMany(models.Orders)
        };

    return Users;
  }