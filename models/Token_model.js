var db = require('../config/database');
var Sequelize = require('sequelize');

var Token_model = db.define('usertokens', {
    id: { type:Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER, allowNull: true, defaultValue: null },
    token: { type: Sequelize.TEXT, allowNull: true, defaultValue: null },
    status: { type: Sequelize.TINYINT, allowNull: true, defaultValue: null },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    type: { type: Sequelize.STRING, allowNull: true, defaultValue: null }
});

module.exports = Token_model;