'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_imagem', { 
      cd_imagem: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      ds_caminho: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      cd_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_usuario',
          key: 'cd_usuario'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_imagem');
  }
};
