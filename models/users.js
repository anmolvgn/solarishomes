module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [6, 22]
          }
      }     
    });
    Users.associate = function(models) {
        Users.hasMany(models.Orders)
        };

    return Users;
  }