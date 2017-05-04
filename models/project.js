'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: {type : DataTypes.STRING, validete : { notEmpty : true}},
    description: {type : DataTypes.TEXT, validate : {  notEmpty : true}},
    finished: {type :  DataTypes.BOOLEAN}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Project;
};