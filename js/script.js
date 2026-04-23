
tailwind.config = {
    darkMode: 'class'
};

const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');

function loadTheme() {
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

loadTheme();

if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}