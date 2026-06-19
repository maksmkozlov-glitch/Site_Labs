// страница входа, подсмотрел в гитхабе
import { useState } from 'react';
import axios from 'axios';

function Login() {
    // стейты для формы
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // отправка формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // сохраняю токен в localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setMessage('Успешно!');
            window.location.href = '/admin';
        } catch (err) {
            setMessage(err.response?.data?.message || 'Ошибка, попробуй еще');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100">
            <div className="bg-white p-8 rounded-2xl shadow w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 border rounded-xl mb-4" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        className="w-full p-3 border rounded-xl mb-4" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-xl font-medium">
                        Войти
                    </button>
                </form>
                {message && <p className="text-center mt-4 text-sm text-zinc-600">{message}</p>}
                <p className="text-center mt-4 text-sm">
                    Нет аккаунта? <a href="/register" className="text-orange-600">Зарегистрироваться</a>
                </p>
            </div>
        </div>
    );
}

export default Login;