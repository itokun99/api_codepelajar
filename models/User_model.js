var db = require('../config/database');
var Sequelize = require('sequelize');

var User_model = db.define('users', {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true  },
    name: { type: Sequelize.STRING(20), allowNull: true, defaultValue: null },
    email: { type: Sequelize.STRING(50), allowNull: true, defaultValue: null },
    password: { type: Sequelize.TEXT, allowNull: true, defaultValue: null },
    type: { type: Sequelize.TINYINT, allowNull: true, defaultValue: null },
    status: { type: Sequelize.TINYINT, allowNull: true, defaultValue: null },
    picture: { type: Sequelize.TEXT, allowNull: true, defaultValue: null },
})

module.exports = User_model;