class ProgramController {
    constructor(programService) {
        this.programService = programService;
    }

    getAll = async (req, res) => {
        try {
            const programs = await this.programService.getAll();
            res.json(programs);
        } catch (err) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    };

    create = async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Нет прав' });
            }

            const { title, level, duration_weeks, price, description } = req.body;
            const program = await this.programService.create({
                title, level, duration_weeks, price, description
            });
            res.status(201).json(program);
        } catch (err) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    };

    delete = async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Нет прав' });
            }

            const { id } = req.params;
            await this.programService.delete(id);
            res.json({ message: 'Программа удалена' });
        } catch (err) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    };
}

module.exports = ProgramController;