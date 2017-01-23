'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    estimatedTime: DataTypes.DATE,
    startTime: DataTypes.DATE,
    finishTime: DataTypes.DATE,
    projectId: DataTypes.BIGINT,
    finished: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.Project, {
          foreignKey: "projectId"
        })
      }
    }
  });
  return Task;
};