const { Model, DataTypes } = require("sequelize");

class UserVideo extends Model{
    static init(sequelize){
        super.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_usuario'
            },
            videoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cd_video'
            },
            watchedTime: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                field: 'qt_tempo_assistido'
            },
            lastWatched: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'ic_ultimo_assistido'
            }
        },{
            tableName: 'tb_usuario_video',
            sequelize
        })
    }
}

module.exports = UserVideo;