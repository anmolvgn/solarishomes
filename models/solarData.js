module.exports = function(sequelize, DataTypes) {
    var SolarData = sequelize.define("SolarData", {
    
    jan: {
          type: DataTypes.INTEGER,
          notNull: true
      },
    feb: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    mar: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    apr: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    may: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    jun: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    jul: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    aug: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    sep: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    oct: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    nov: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    dec: {
        type: DataTypes.INTEGER,
        notNull: true
    }
    });
    return SolarData;
  };