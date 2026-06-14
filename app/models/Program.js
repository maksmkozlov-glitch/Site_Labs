class ProgramModel {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const result = await this.db.query('SELECT * FROM programs ORDER BY id');
        return result.rows;
    }

    async getById(id) {
        const result = await this.db.query('SELECT * FROM programs WHERE id = $1', [id]);
        return result.rows[0];
    }

    async getFiltered(level, search) {
        let sql = 'SELECT * FROM programs WHERE 1=1';
        let params = [];
        let idx = 1;

        if (level && level !== '') {
            sql += ` AND level = $${idx}`;
            params.push(level);
            idx++;
        }

        if (search && search !== '') {
            sql += ` AND title ILIKE $${idx}`;
            params.push(`%${search}%`);
            idx++;
        }

        sql += ' ORDER BY id';
        const result = await this.db.query(sql, params);
        return result.rows;
    }

    async create(program) {
        const { title, level, duration_weeks, price, description } = program;
        const result = await this.db.query(
            `INSERT INTO programs (title, level, duration_weeks, price, description) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, level, duration_weeks, price, description || null]
        );
        return result.rows[0];
    }

    async update(id, program) {
        const { title, level, duration_weeks, price, description } = program;
        const result = await this.db.query(
            `UPDATE programs SET title=$1, level=$2, duration_weeks=$3, price=$4, description=$5 
             WHERE id=$6 RETURNING *`,
            [title, level, duration_weeks, price, description || null, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await this.db.query('DELETE FROM programs WHERE id = $1', [id]);
        return true;
    }
}

module.exports = ProgramModel;