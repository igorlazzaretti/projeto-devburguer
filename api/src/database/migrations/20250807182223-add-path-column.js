// Migration que adiciona a coluna 'path' à tabela 'Categories'
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'path', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('categories', 'path');
  }
};
