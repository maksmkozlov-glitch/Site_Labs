 // настройка подключения к бд через sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// беру настройки из .env файла
const sequelize = new Sequelize(
    process.env.DB_NAME || 'spa_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false, // убрал логи, чтобы не спамило в консоль
    }
);

module.exports = sequelize;