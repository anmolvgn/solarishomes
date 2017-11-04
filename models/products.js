module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
      productName: DataTypes.STRING,
      productDescription: DataTypes.STRING,
      cost: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      imgUrl: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      manufacturer: DataTypes.FLOAT,
      moduleType: DataTypes.INTEGER, //foreign key
     
    });
    return Products;
  };