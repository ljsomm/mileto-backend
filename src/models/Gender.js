const { Model, DataTypes } = require("sequelize/dist");

class Gender extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: 'cd_genero'
            },
            abbreviation: {
                type: DataTypes.STRING(1),
                allowNull: false,
                field: 'sg_genero'
            },
            customName: {
                type: DataTypes.STRING,
                field: 'nm_personalizado'
            },
            treatment: {
                type: DataTypes.STRING(1),
                field: 'sg_tratamento'
            },
            userId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_usuario'
            }
        }, { sequelize, tableName: 'tb_genero' });
    }

    static associate(models){
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'Users'
        });
    }
}

module.exports = Gender;