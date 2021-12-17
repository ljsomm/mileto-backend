'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_usuario', {
        cd_usuario: { 
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nm_usuario: {
          type: Sequelize.STRING,
          allowNull: false
        },
        dt_nascimento: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        nm_email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        cd_senha: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_usuario');
  }
};
