'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_genero', { 
      cd_genero: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sg_genero: {
        type: Sequelize.CHAR(1),
        allowNull: false
      },
      nm_personalizado: {
        type: Sequelize.STRING
      },
      sg_tratamento: {
        type: Sequelize.CHAR(1)
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
    await queryInterface.dropTable('tb_genero');
  }
};
