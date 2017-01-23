'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      finished : {
        allowNull:true,
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      projectId : {
        type:Sequelize.BIGINT
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        allowNull:true,
        type: Sequelize.TEXT
      },
      estimatedTime: {
        allowNull:true,
        type: Sequelize.DATE
      },
      startTime: {
        allowNull:true,
        type: Sequelize.DATE
      },
      finishTime: {
        allowNull:true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tasks');
  }
};