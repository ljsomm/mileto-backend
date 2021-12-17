const { Model, DataTypes } = require("sequelize");

class User extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'cd_usuario'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'nm_usuario'
            },
            birthDate: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'dt_nascimento'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'nm_email'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'cd_senha'
            }
        }, {
            sequelize,
            tableName: 'tb_usuario'
        });
    }

    static associate(models){
        this.hasMany(models.Image, {
            foreignKey: 'userId',
            as: 'Images'
        });
        this.hasMany(models.Gender, {
            foreignKey: 'userId',
            as: 'Genres'
        });
    }
}

module.exports = User;