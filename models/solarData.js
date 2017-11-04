module.exports = function(sequelize, DataTypes) {
    var SolarData = sequelize.define("SolarData", {
    
      Jan: {
          type: DataTypes.FLOAT,
          allowNull: false
      },
      feb: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      mar: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      apr: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      may: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      jun: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      jul: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      aug: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      sep: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      oct: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      nov: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
      dec: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    });
    return SolarData;
  };