module.exports = function(sequelize, DataTypes) {
    var CostData = sequelize.define("CostData", {
      state: {
          type: DataTypes.STRING,
          validate: {
              len: [2]
          }
        },
      Jan: DataTypes.FLOAT,
      feb: DataTypes.FLOAT,
      mar: DataTypes.FLOAT,
      apr: DataTypes.FLOAT,
      may: DataTypes.FLOAT,
      jun: DataTypes.FLOAT,
      jul: DataTypes.FLOAT,
      aug: DataTypes.FLOAT,
      sep: DataTypes.FLOAT,
      oct: DataTypes.FLOAT,
      nov: DataTypes.FLOAT,
      dec: DataTypes.FLOAT,
      average: DataTypes.FLOAT
    });
    return CostData;
  };