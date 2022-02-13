'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_video', { 
      cd_video: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nm_titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ds_caminho: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cd_secao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_secao',
          key: 'cd_secao'
        }
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_video');
  }
};
