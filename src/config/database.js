const mysql2 = require('mysql2');

module.exports = {
    dialect: 'mysql',
    dialectModule: mysql2,
    host: '172.18.144.1',
    database: 'db_mileto',
    username: 'root',
    password: '@mileto123',
    define: {
        timestamps: false
    }
}