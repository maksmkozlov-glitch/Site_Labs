class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }

    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Заполните все поля' });
            }

            const existingUser = await this.userService.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            const hashedPassword = await this.authService.hashPassword(password);
            const user = await this.userService.createUser({ name, email, password: hashedPassword });

            res.status(201).json({
                message: 'Регистрация успешна',
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (err) {
            console.error('Ошибка регистрации:', err);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Заполните все поля' });
            }

            const user = await this.userService.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Неверный email или пароль' });
            }

            const isMatch = await this.authService.comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный email или пароль' });
            }

            const token = this.authService.generateToken(user);

            res.json({
                token,
                user: { id: user.id, name: user.name, email: user.email, role: user.role }
            });
        } catch (err) {
            console.error('Ошибка логина:', err);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    };
}

module.exports = AuthController;