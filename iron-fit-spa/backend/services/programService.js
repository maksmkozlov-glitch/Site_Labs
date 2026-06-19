const { Program } = require('../models');

class ProgramService {
    async getAll() {
        return await Program.findAll();
    }

    async create(programData) {
        return await Program.create(programData);
    }

    async delete(id) {
        return await Program.destroy({ where: { id } });
    }

    async findById(id) {
        return await Program.findByPk(id);
    }
}

module.exports = ProgramService;