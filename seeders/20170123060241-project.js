'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Projects', [{
      id: 1,
      name: "eForm",
      description : "eForm is bla bla bla bla bla bla bla bla bla bla bla",
    },
    {
      id: 2,
        name: "eForm-api",
      description : "eForm-api is bla bla bla bla bla bla bla bla bla bla bla",  
    }],{})
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Projects', null, {});
  }
};
