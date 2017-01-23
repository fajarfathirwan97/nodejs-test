'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    id: {primaryKey:true , type: DataTypes.BIGINT},
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    finished: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Project;
};