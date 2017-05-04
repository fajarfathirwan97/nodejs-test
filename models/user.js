'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        },
        createHash: function (input) {
          return models.Hash.create(input).catch(function(err){console.log(err.toString())});
        }
      },
      instanceMethods: {
      }
    });
  return User;
};