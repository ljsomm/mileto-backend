const mysql2 = require('mysql2');

module.exports = {
    dialect: 'mysql',
    dialectModule: mysql2,
    host: '192.168.0.17',
    database: 'db_mileto',
    username: 'root',
    password: '@mileto123',
    define: {
        timestamps: false
    }
}