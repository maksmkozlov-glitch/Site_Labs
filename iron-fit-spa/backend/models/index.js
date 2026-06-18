const sequelize = require('../config/database');
const User = require('./User');
const Program = require('./Program');

const db = {
    sequelize,
    User,
    Program
};

module.exports = db;