'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_usuario_video', { 
      cd_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_usuario',
          key: 'cd_usuario'
        }
      },
      cd_video: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_video',
          key: 'cd_video'
        }
      },
      qt_tempo_assistido: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      ic_ultimo_assistido: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_usuario');
  }
};
