const { Model, DataTypes } = require("sequelize");

class Image extends Model{
    static init(sequelize){
        super.init({
            id: { 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'cd_imagem'
              },
              path: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'ds_caminho'
              },
              userId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_usuario'
              }
        }, {tableName: 'tb_imagem', sequelize});
    }

    static associate(models){
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'Users'
        });
    }
}

module.exports = Image;