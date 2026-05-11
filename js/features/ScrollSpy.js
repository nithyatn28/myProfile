const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    // reset style
    link.style.color = "gray";
    link.style.fontWeight = "normal";

    // apply active style
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "black";
      link.style.fontWeight = "bold";
    }
  });
});