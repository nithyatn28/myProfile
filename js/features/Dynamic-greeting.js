 function initDynamicGreeting() {
    const greetingEl = document.getElementById("greeting");
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night"; 
    }

     greetingEl.textContent = greeting + ", I am";
}
initDynamicGreeting();