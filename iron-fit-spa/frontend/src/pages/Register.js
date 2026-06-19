// регистрация (смотрел на логин)
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            setMessage('Регистрация прошла! Теперь войди.');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Ошибка');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100">
            <div className="bg-white p-8 rounded-2xl shadow w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Имя" 
                        className="w-full p-3 border rounded-xl mb-4" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
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
                        Зарегистрироваться
                    </button>
                </form>
                {message && <p className="text-center mt-4 text-sm text-zinc-600">{message}</p>}
                <p className="text-center mt-4 text-sm">
                    Уже есть аккаунт? <a href="/login" className="text-orange-600">Войти</a>
                </p>
            </div>
        </div>
    );
}

export default Register;