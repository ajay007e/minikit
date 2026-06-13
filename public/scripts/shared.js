const root = document.documentElement;

/* Theme */

const themeButton = document.querySelector('[data-theme-toggle]');

const savedTheme = localStorage.getItem('theme') || 'dark';

root.setAttribute('data-theme', savedTheme);

themeButton?.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', nextTheme);

  localStorage.setItem('theme', nextTheme);
});
