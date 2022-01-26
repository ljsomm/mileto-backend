const { Model,DataTypes } = require("sequelize");

class Thumbnail extends Model{
    static init(sequelize){
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: 'cd_thumbnail'
            },
            path: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'ds_caminho'
            },
            courseId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_curso'
            }
        },{
            sequelize,
            tableName: 'tb_thumbnail'
        });
    }

    static associate(models){
        this.belongsTo(models.Course, {
            as: 'Courses',
            foreignKey: 'courseId'
        });
    }
}

module.exports = Thumbnail;