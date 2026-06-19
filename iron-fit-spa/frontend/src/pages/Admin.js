// админка, тут показываются программы
import { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
    const [programs, setPrograms] = useState([]);
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('beginner');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');

    const token = localStorage.getItem('token');

    // получаю программы с бэка
    const fetchPrograms = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/programs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPrograms(res.data);
        } catch (err) {
            console.log('Ошибка', err);
        }
    };

    // проверка токена при загрузке
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
            return;
        }
        fetchPrograms();
    }, []);

    // добавить программу
    const addProgram = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/programs', {
                title, level, duration_weeks: parseInt(duration), price: parseInt(price), description: desc
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // обновляю список
            fetchPrograms();
            // очищаю форму
            setTitle(''); setDuration(''); setPrice(''); setDesc('');
        } catch (err) {
            alert('Не получилось добавить');
        }
    };

    // удалить
    const deleteProgram = async (id) => {
        if (!confirm('Точно удалить?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/programs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPrograms();
        } catch (err) {
            alert('Ошибка при удалении');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Админ-панель</h1>

            {/* форма добавления */}
            <div className="bg-white p-6 rounded-2xl shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Добавить программу</h2>
                <form onSubmit={addProgram} className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Название" className="p-3 border rounded-xl" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <select className="p-3 border rounded-xl" value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="beginner">Для новичков</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                    </select>
                    <input type="number" placeholder="Недели" className="p-3 border rounded-xl" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                    <input type="number" placeholder="Цена" className="p-3 border rounded-xl" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <textarea placeholder="Описание" className="p-3 border rounded-xl col-span-2" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <button type="submit" className="bg-orange-600 text-white p-3 rounded-xl col-span-2">Добавить</button>
                </form>
            </div>

            {/* таблица с программами */}
            <h2 className="text-xl font-bold mb-4">Все программы</h2>
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-100">
                        <tr>
                            <th className="p-3 text-left">Название</th>
                            <th className="p-3 text-left">Цена</th>
                            <th className="p-3 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.map(p => (
                            <tr key={p.id} className="border-t">
                                <td className="p-3">{p.title}</td>
                                <td className="p-3">{p.price} ₽</td>
                                <td className="p-3">
                                    <button onClick={() => deleteProgram(p.id)} className="text-red-600">Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;