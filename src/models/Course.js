const { Model, DataTypes } = require("sequelize");

class Course extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'cd_curso'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'nm_curso'
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'ds_curso'
            }
        }, {sequelize, tableName: 'tb_curso'});
    }

    static associate(models){
        this.belongsToMany(models.User, {
            through: 'UserCourse',
            foreignKey: 'courseId',
            as: 'Users'
        });
        this.hasMany(models.Thumbnail, {
            as: 'Images',
            foreignKey: 'courseId'
        });
        this.hasMany(models.Section, {
            as: 'Sections',
            foreignKey: 'courseId'
        });
    }
}

module.exports = Course;