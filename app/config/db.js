const { Pool } = require('pg');

class Database {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST || 'postgres',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'ironfit_db'
        });
    }

    async query(text, params) {
        try {
            const result = await this.pool.query(text, params);
            return result;
        } catch (err) {
            console.error('Ошибка БД:', err);
            throw err;
        }
    }
}

module.exports = Database;