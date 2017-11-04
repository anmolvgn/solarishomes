module.exports = function(sequelize, DataTypes) {
    var Orders = sequelize.define("Orders", {
      productName: DataTypes.STRING,
      productDescription: DataTypes.STRING,
      totalCost: DataTypes.FLOAT,
      totalQty: DataTypes.INTEGER,
      totalTax: DataTypes.FLOAT,
      orderdate: DataTypes.FLOAT,     
    });

  Orders.associate = function(models) {
      Orders.belongsTo(models.Users, {
          foreignKey: {
              allowNull: false
          }
      });
  };
  return Orders;
};