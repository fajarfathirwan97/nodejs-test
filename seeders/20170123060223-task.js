'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [{
      id: 1,
      title: "eForm",
      description : "Add New Admin Fee Feature",
      projectId : 1
    },
    {
      id: 2,
      title: "eForm-api",
      description : "Create New API",    
      projectId : 2

    }],{})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
