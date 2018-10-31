'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('shortUrls', [{
       title:'zzzzz',
       short:'zz',
       url:'qwertyuiop',
       idUser:'1',
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
