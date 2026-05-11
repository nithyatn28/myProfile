function initThemeToggle(){
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("portfolio-theme");

    function updateIcon() {
        if(root.classList.contains("dark")) {
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        } else {
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        }
    }

    function setDarkTheme() {
        root.classList.add("dark");
        body.classList.add("dark-mode");
        updateIcon();
    }

    function setLightTheme() {
        root.classList.remove("dark");
        body.classList.remove("dark-mode");
        updateIcon();
    }

    if(savedTheme === "dark"){
        setDarkTheme();
    } else {
        setLightTheme();
    }

    toggleBtn.addEventListener("click", function(){
        if(root.classList.contains("dark")){
            setLightTheme();
            localStorage.setItem("portfolio-theme","light");
            console.log("Light mode enabled");
        } else {
            setDarkTheme();
            localStorage.setItem("portfolio-theme","dark");
            console.log("Dark mode enabled");
        }
    });
}