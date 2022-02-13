const { Model, DataTypes } = require("sequelize");

class Video extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: 'cd_video'
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'nm_titulo'
            },
            path: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'ds_caminho'
            },
            sectionId: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'cd_secao'
            }
        }, 
        {
            sequelize,
            tableName: 'tb_video'
        })
    }

    static associate(models){
        this.belongsTo(models.Section, {
            as: 'Sections',
            foreignKey: 'sectionId'
        });
        this.belongsToMany(models.User, { 
            as: 'Users',
            foreignKey: 'videoId',
            through: 'UserVideo'
         });
    }
}

module.exports = Video;