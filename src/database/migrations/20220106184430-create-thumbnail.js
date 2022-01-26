'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('tb_thumbnail', { 
        cd_thumbnail: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        ds_caminho: {
          type: Sequelize.TEXT,
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
      await queryInterface.dropTable('tb_thumbnail');
  }
};
