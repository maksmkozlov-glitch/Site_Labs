const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'my_secret_key',
            { expiresIn: '7d' }
        );
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'my_secret_key');
        } catch (err) {
            return null;
        }
    }
}

module.exports = AuthService;