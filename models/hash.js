'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hash = sequelize.define('Hash', {
    userId: DataTypes.INTEGER,
    hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Hash;
};