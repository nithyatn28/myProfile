// Create progress container
const progressContainer = document.createElement("div");
progressContainer.style.position = "fixed";
progressContainer.style.top = "0";
progressContainer.style.left = "0";
progressContainer.style.width = "100%";
progressContainer.style.height = "5px";
progressContainer.style.background = "#ddd";
progressContainer.style.zIndex = "1000";

// Create progress bar
const progressBar = document.createElement("div");
progressBar.style.height = "100%";
progressBar.style.width = "0%";
progressBar.style.background = "#4caf50";

// Append bar to container
progressContainer.appendChild(progressBar);

// Add to body
document.body.appendChild(progressContainer);

// Scroll event
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;

  const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

  progressBar.style.width = scrollPercent + "%";
});