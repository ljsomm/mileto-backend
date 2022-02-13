'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_secao', { 
      cd_secao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nm_secao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cd_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_curso',
          key: 'cd_curso'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_secao');
  }
};
