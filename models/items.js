module.exports = function(sequelize, DataTypes){
    var Items = sequelize.define("Items", {
        ItemName: DataTypes.STRING,
        ItemDescription: DataTypes.STRING,
        ItemCost: DataTypes.FLOAT,
        ItemStock: DataTypes.INTEGER,
        ItemQuant: DataTypes.INTEGER
    });

    Items.associate = function(models) {
        Items.belongsTo(model.Orders, {
            foreignKey:{
                allowNull: false
            }
        });
        Items.belongsTo(model.Products, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Items;
};