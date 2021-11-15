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
    await queryInterface.bulkInsert('Faqs', [
      {
        type: 'Product',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Product',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Orders',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Orders',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Shipping',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Shipping',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Returns',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        type: 'Returns',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'General',
        question: 'faq question',
        answer: 'answer to question',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'General',
        question: 'faq question',
        answer: 'answer to question',
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
     await queryInterface.bulkDelete('Faqs', null, {});
  }
};
