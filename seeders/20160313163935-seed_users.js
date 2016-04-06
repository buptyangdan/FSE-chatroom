'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      var users = [{
        username: 'jiangha',
        password: '123456',
        status: 1,
        location: 'tokyo',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        username: 'xxxxx',
        password: '123426',
        status: 2,
        location: 'toky',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      ]
      return queryInterface.bulkInsert('Users', users, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
