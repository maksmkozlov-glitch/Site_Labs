const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const UserService = require('./services/userService');
const ProgramService = require('./services/programService');
const AuthService = require('./services/authService');

const AuthController = require('./controllers/authController');
const ProgramController = require('./controllers/programController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DI
const userService = new UserService();
const programService = new ProgramService();
const authService = new AuthService();

const authController = new AuthController(userService, authService);
const programController = new ProgramController(programService);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// роуты
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes');

app.use('/api/auth', authRoutes(authController));
app.use('/api/programs', programRoutes(programController));

app.get('/api/health', (req, res) => {
    res.json({ message: 'Сервер работает' });
});

app.listen(PORT, () => {
    console.log(`Сервер на порту ${PORT}`);
});