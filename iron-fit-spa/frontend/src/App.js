//роутинг (взял пример с ютуба)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

// главная страница, просто фон и кнопка
function Home() {
    return (
        <div 
            className="min-h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
            style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://picsum.photos/id/1015/2000/1200')"
            }}
        >
            <div className="text-white max-w-xl">
                <h1 className="text-5xl font-bold mb-6">Стань сильнее<br />с Iron Fit</h1>
                <p className="text-xl mb-10">Современный фитнес-зал для новичков</p>
                <Link to="/login" className="bg-orange-600 px-10 py-5 rounded-2xl text-lg inline-block text-white">Войти</Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div>
                {/* шапка, везде одинаково */}
                <header className="bg-white p-4 shadow">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold text-orange-600">Iron Fit</Link>
                        <nav className="flex gap-4">
                            <Link to="/" className="hover:text-orange-600">Главная</Link>
                            <Link to="/login" className="hover:text-orange-600">Вход</Link>
                            <Link to="/admin" className="hover:text-orange-600">Админ</Link>
                        </nav>
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;