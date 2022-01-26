'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_usuario_curso', { 
      cd_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_usuario',
          key: 'cd_usuario'
        }
      },
      cd_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_curso',
          key: 'cd_curso'
        }
      },
      ic_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_usuario_curso');
  }
};
