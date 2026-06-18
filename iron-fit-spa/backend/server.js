const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // добавь это

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// роуты
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ message: 'Сервер работает' });
});

app.listen(PORT, () => {
    console.log(`Сервер на порту ${PORT}`);
});