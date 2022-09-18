const mysql2 = require('mysql2');

module.exports = {
    dialect: 'mysql',
    dialectModule: mysql2,
    host: process.env.DB_HOST || 'localhost',
    database: 'db_mileto',
    username: 'root',
    password: '@mileto123',
    define: {
        timestamps: false
    }
}