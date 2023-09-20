/*
* Theme: Dark Mode
* @see: https://tailwindcss.com/docs/dark-mode
*/
export default class ThemeMode {
    constructor(_theme='light') {
        localStorage.theme = _theme
    }
    
    system() {
        // Whenever the user explicitly chooses to respect the OS preference
        return localStorage.removeItem('theme')
    }

    update(_theme='light') {
        localStorage.theme = _theme
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
}