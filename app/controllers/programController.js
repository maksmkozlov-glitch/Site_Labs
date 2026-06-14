class ProgramController {
    constructor(programModel, feedbackModel, logger) {
        this.programModel = programModel;
        this.feedbackModel = feedbackModel;
        this.logger = logger;
    }

    async createProgram(req, res) {
        try {
            const { title, level, duration_weeks, price, description } = req.body;

            if (!title || !level || !duration_weeks || !price) {
                return res.redirect('/admin');
            }
            
            await this.programModel.create({
                title: title,
                level: level,
                duration_weeks: parseInt(duration_weeks),
                price: parseInt(price),
                description: description || ''
            });
            
            this.logger.log('Добавлена программа: ' + title);
            res.redirect('/admin');
        } catch (err) {
            this.logger.error('Ошибка при добавлении: ' + err.message);
            res.redirect('/admin');
        }
    }

    async deleteProgram(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.programModel.delete(id);
            this.logger.log('Удалена программа ID: ' + id);
            res.redirect('/admin');
        } catch (err) {
            this.logger.error('Ошибка при удалении: ' + err.message);
            res.redirect('/admin');
        }
    }

    async createFeedback(req, res) {
        try {
            const { name, email, message, program_id } = req.body;
            
            if (!name || !email || !message) {
                return res.redirect('/contact');
            }
            
            await this.feedbackModel.create({
                name: name,
                email: email,
                message: message,
                program_id: program_id || null
            });
            
            this.logger.log('Новый отзыв от ' + name);
            res.redirect('/contact');
        } catch (err) {
            this.logger.error('Ошибка при отправке отзыва: ' + err.message);
            res.redirect('/contact');
        }
    }

    async markFeedbackRead(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.feedbackModel.markAsRead(id);
            res.redirect('/admin');
        } catch (err) {
            this.logger.error('Ошибка: ' + err.message);
            res.redirect('/admin');
        }
    }
}
module.exports = ProgramController;