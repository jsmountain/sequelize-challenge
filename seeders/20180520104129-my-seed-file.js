'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      nama : 'John',
      gender : 'laki-laki',
      no_telp : '08154023099',
      alamat : 'Bandar Lampung',
      created_at : new Date(),
      updated_at : new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
