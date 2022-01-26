'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_curso', { 
      cd_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
      },
      nm_curso: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ds_curso: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_curso');
  }
};
