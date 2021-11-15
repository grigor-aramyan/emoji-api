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
    await queryInterface.bulkInsert('TeamMembers', [
      {
        name: 'john',
        description: 'very first team member',
        avatar: 'https://toppng.com/uploads/preview/file-svg-profile-icon-vector-11562942678pprjdh47a8.png',
        insta: 'instagram.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'jane',
        description: 'some awesome description for jane',
        avatar: '',
        insta: 'instagram.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('TeamMembers', null, {});
  }
};
