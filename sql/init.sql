--таблица программ тренировок
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration_weeks INT NOT NULL,
    price INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--таблица отзывов
CREATE TABLE IF NOT EXISTS feedbacks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    program_id INT REFERENCES programs(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--статистика просмотров страниц
CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    ip VARCHAR(45),
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--начальные программы
INSERT INTO programs (title, level, duration_weeks, price, description) VALUES
('Сила для новичков', 'beginner', 8, 4500, 'Базовые упражнения для укрепления всего тела'),
('Кроссфит Начальный', 'beginner', 10, 5500, 'Функциональные тренировки с собственным весом'),
('Набор массы', 'intermediate', 12, 6500, 'Программа для роста мышечной массы'),
('Функциональная сила', 'intermediate', 10, 7000, 'Развитие взрывной силы и выносливости'),
('Продвинутый Power', 'advanced', 16, 8500, 'Интенсивные тренировки для опытных атлетов');

--тестовый отзыв
INSERT INTO feedbacks (name, email, message, is_read) VALUES
('Алексей', 'alex@test.ru', 'Отличный зал, рекомендую!', TRUE);