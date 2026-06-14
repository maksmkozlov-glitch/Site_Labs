class PageController {
    constructor(programModel, feedbackModel, logger) {
        this.programModel = programModel;
        this.feedbackModel = feedbackModel;
        this.logger = logger;
    }

    async home(req, res) {
        try {
            const html = `
                <div class="min-h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
                     style="background-image: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://picsum.photos/id/1015/2000/1200');">
                    <div class="text-white max-w-xl">
                        <h1 class="text-5xl font-bold mb-6">Стань сильнее<br>с Iron Fit</h1>
                        <p class="text-xl mb-10">Современный фитнес-зал для новичков</p>
                        <a href="/programs" class="bg-orange-600 hover:bg-orange-700 px-10 py-5 rounded-2xl text-lg font-medium inline-block">
                            Смотреть программы
                        </a>
                    </div>
                </div>
            `;
            res.send(this.renderLayout(html));
        } catch (err) {
            res.status(500).send('Ошибка сервера');
        }
    }

    async programsPage(req, res) {
        try {
            const programs = await this.programModel.getAll();
            
            let programsHtml = '';
            for (let i = 0; i < programs.length; i++) {
                const p = programs[i];
                programsHtml += `
                    <div class="bg-white dark:bg-zinc-900 p-6 rounded-2xl border">
                        <h3 class="font-bold text-xl">${p.title}</h3>
                        <p class="text-orange-600">${p.price} ₽</p>
                        <p class="text-sm">${p.duration_weeks} недель</p>
                    </div>
                `;
            }
            
            const html = `
                <div class="max-w-5xl mx-auto px-6 py-12">
                    <h1 class="text-4xl font-bold text-center mb-6">Программы тренировок</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${programsHtml}
                    </div>
                </div>
            `;
            res.send(this.renderLayout(html));
        } catch (err) {
            res.status(500).send('Ошибка сервера');
        }
    }

    async aboutPage(req, res) {
        const html = `
            <div class="max-w-5xl mx-auto px-6 py-12">
                <h1 class="text-4xl font-bold text-center mb-8">О нас</h1>
                <p class="text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12">
                    Iron Fit — небольшой уютный фитнес-зал для всех.
                </p>
            </div>
        `;
        res.send(this.renderLayout(html));
    }

    async contactPage(req, res) {
        const html = `
            <div class="max-w-5xl mx-auto px-6 py-16">
                <h1 class="text-4xl font-bold text-center mb-8">Контакты</h1>
                <p>Email: info@ironfit.ru<br>Телефон: +7 (999) 123-45-67</p>
            </div>
        `;
        res.send(this.renderLayout(html));
    }

    async adminPage(req, res) {
        try {
            const programs = await this.programModel.getAll();
            
            let programsHtml = '';
            for (let i = 0; i < programs.length; i++) {
                const p = programs[i];
                programsHtml += `
                    <tr class="border-b">
                        <td class="px-4 py-3">${p.title}</td>
                        <td class="px-4 py-3">${p.price} ₽</td>
                        <td class="px-4 py-3">
                            <form action="/admin/program/delete/${p.id}" method="POST" onsubmit="return confirm('Удалить?')">
                                <button type="submit" class="text-red-600">Удалить</button>
                            </form>
                        </td>
                    </tr>
                `;
            }
            
            const html = `
                <div class="max-w-4xl mx-auto px-6 py-12">
                    <h1 class="text-3xl font-bold mb-8">Админ-панель</h1>
                    
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold mb-4">Добавить программу</h2>
                        <form action="/admin/program/create" method="POST" class="bg-white dark:bg-zinc-900 p-6 rounded-2xl border mb-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="title" placeholder="Название" required class="px-4 py-3 border rounded-xl">
                                <select name="level" required class="px-4 py-3 border rounded-xl">
                                    <option value="beginner">Для новичков</option>
                                    <option value="intermediate">Средний</option>
                                    <option value="advanced">Продвинутый</option>
                                </select>
                                <input type="number" name="duration_weeks" placeholder="Недели" required class="px-4 py-3 border rounded-xl">
                                <input type="number" name="price" placeholder="Цена" required class="px-4 py-3 border rounded-xl">
                                <textarea name="description" placeholder="Описание" class="px-4 py-3 border rounded-xl md:col-span-2"></textarea>
                                <button type="submit" class="bg-orange-600 text-white px-6 py-3 rounded-xl">Добавить</button>
                            </div>
                        </form>
                    </div>
                    
                    <h2 class="text-2xl font-bold mb-4">Программы</h2>
                    <table class="w-full bg-white dark:bg-zinc-900 rounded-2xl border">
                        <thead class="bg-zinc-100">
                            <tr><th class="px-4 py-3">Название</th><th>Цена</th><th></th></tr>
                        </thead>
                        <tbody>${programsHtml}</tbody>
                    </table>
                </div>
            `;
            res.send(this.renderLayout(html));
        } catch (err) {
            res.status(500).send('Ошибка сервера');
        }
    }

    renderLayout(content) {
        return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Iron Fit</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-zinc-100 dark:bg-zinc-950">
    <header class="bg-white dark:bg-zinc-900 py-5 border-b">
        <div class="max-w-5xl mx-auto px-6 flex justify-between">
            <a href="/" class="text-2xl font-bold">Iron Fit</a>
            <nav class="hidden md:flex gap-8 text-lg">
                <a href="/" class="hover:text-orange-500">Главная</a>
                <a href="/programs" class="hover:text-orange-500">Программы</a>
                <a href="/about" class="hover:text-orange-500">О нас</a>
                <a href="/contact" class="hover:text-orange-500">Контакты</a>
                <a href="/admin" class="hover:text-orange-500 text-sm bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full">Админ</a>
            </nav>
        </div>
    </header>
    <main>${content}</main>
    <footer class="bg-white dark:bg-zinc-900 py-8 text-center text-sm">
        © 2026 Iron Fit
    </footer>
</body>
</html>
        `;
    }
}

module.exports = PageController;