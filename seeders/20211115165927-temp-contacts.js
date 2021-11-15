'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     
     await queryInterface.bulkInsert('Contacts', [{
      phone: '123456',
      email: 'test@gmail.com',
      address: 'Netherlands, Van der Muchen 16,3',
      whatsapp: '123456',
      instagram: 'instagram.com',
      facebook: 'facebook.com',
      tiktok: 'tiktok.com',
      youtube: 'youtube.com',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Contacts', null, {});
  }
};
