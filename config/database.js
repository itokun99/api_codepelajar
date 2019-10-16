var mysql = require('mysql');
var Sequelize = require('sequelize');
// sequelize connection
var conn = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_MSQL_PORT,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timezone: "+07:00",
        define: {
            timestamps: true
        }
    }
);

module.exports = conn;