function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        root.classList.remove('lightTheme');
        root.classList.add('darkTheme');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.remove('darkTheme');
        root.classList.add('lightTheme');
        localStorage.setItem('theme', 'light');
    }
}

function setTheme(themeName) {
    const root = document.documentElement;

    if (themeName === 'light') {
        root.classList.remove('darkTheme');
        root.classList.add('lightTheme');
        localStorage.setItem('theme', 'light');
    } else if (themeName === 'dark') {
        root.classList.remove('lightTheme');
        root.classList.add('darkTheme');
        localStorage.setItem('theme', 'dark');
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

initializeTheme();