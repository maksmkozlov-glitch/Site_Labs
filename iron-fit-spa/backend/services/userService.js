const { User } = require('../models');

class UserService {
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async findById(id) {
        return await User.findByPk(id);
    }
}

module.exports = UserService;