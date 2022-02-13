const { Model, DataTypes } = require("sequelize");

class Section extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'cd_secao'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'nm_secao'
            },
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_curso'
            }
        }, {
            sequelize,
            tableName: 'tb_secao'
        });
    }

    static associate(models){
        this.belongsTo(models.Course, {
            foreignKey: 'courseId',
            as: 'Courses'
        });

        this.hasMany(models.Video, {
            as: 'Videos',
            foreignKey: 'sectionId'
        });
    }
}

module.exports = Section;