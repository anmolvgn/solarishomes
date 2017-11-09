module.exports = function(sequelize, DataTypes){
    var Items = sequelize.define("Items", {
        ItemName: DataTypes.STRING,
        ItemDescription: DataTypes.STRING,
        ItemCost: DataTypes.FLOAT,
        ItemStock: DataTypes.INTEGER,
        ItemQuant: DataTypes.INTEGER
    });

    Items.associate = function(models) {
        Items.belongsTo(models.Orders, {
            foreignKey:{
                allowNull: false
            }
        });
<<<<<<< HEAD
        Items.belongsTo(models.Products, {
            foreignKey: {
                allowNull: false
            }
        });
=======
      
>>>>>>> cbcc2fd132f398eb63540bee0cd954802ba68201
    };
    return Items;
};