const { Model, DataTypes } = require("sequelize");

class UserCourse extends Model{
    static init(sequelize){
        super.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_usuario'
            },
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_curso'
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                field: 'ic_admin'
            }
        }, {sequelize, tableName: 'tb_usuario_curso'});
    }
}

module.exports = UserCourse;