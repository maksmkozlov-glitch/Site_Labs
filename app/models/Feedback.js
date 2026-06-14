class FeedbackModel {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const result = await this.db.query(`
            SELECT f.*, p.title as program_title 
            FROM feedbacks f 
            LEFT JOIN programs p ON f.program_id = p.id 
            ORDER BY f.created_at DESC
        `);
        return result.rows;
    }

    async create(feedback) {
        const { name, email, message, program_id } = feedback;
        const result = await this.db.query(
            `INSERT INTO feedbacks (name, email, message, program_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, message, program_id || null]
        );
        return result.rows[0];
    }

    async markAsRead(id) {
        await this.db.query('UPDATE feedbacks SET is_read = TRUE WHERE id = $1', [id]);
        return true;
    }

    async logPageView(page, ip, userAgent) {
        await this.db.query(
            'INSERT INTO page_views (page, ip, user_agent) VALUES ($1, $2, $3)',
            [page, ip, userAgent]
        );
    }
}
module.exports = FeedbackModel;