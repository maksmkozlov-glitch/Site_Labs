const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // получаю токен из заголовка Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Нет токена' });
        }

        const token = authHeader.split(' ')[1]; // "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Нет токена' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_secret_key');
        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ message: 'Неверный токен' });
    }
};