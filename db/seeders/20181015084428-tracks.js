'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('tracks', [{
        shortUrlId:'1',
        ipAddress:'123',
        referrerUrl:'1111',
        createdAt: '2018-10-10',
        updatedAt: '2018-10-10'

      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
