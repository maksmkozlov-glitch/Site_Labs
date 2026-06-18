const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// регистрация
exports.register = async (req, res) => {
    try {
        console.log('Запрос на регистрацию:', req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log('Поля не заполнены');
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Пользователь уже существует');
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const user = await User.create({ name, email, password });
        console.log('Пользователь создан:', user.id);
        res.status(201).json({ message: 'Регистрация успешна', user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// логин
exports.login = async (req, res) => {
    try {
        console.log('Запрос на логин:', req.body.email);
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Поля не заполнены');
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('Пользователь не найден');
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Пароль не совпадает');
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'my_secret_key',
            { expiresIn: '7d' }
        );

        console.log('Логин успешен:', user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error('Ошибка логина:', err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};