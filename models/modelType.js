//create table w/ options(type) , approxEfficency, ModuleType(or moduleCover) and TempCoeff.
// for TempCoeff look to see if negs can be produced with integer dataTypes.

module.exports = function(sequelize, dataTypes) {
    var modelTypes = sequelize.define("modelTypes", {
        ModelType: dataTypes.STRING,
        ApproxEff: dataTypes.FLOAT(3),
        ModuleCover: dataTypes, STRING,
        TempCoeff: dataTypes.FLOAT(3)
    });

    modelTypes.associate = function(models) {
        modelTypes.belongsTo(models.products, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return modelTypes;
};