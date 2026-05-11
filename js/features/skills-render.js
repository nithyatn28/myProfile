function renderSkills(){
    const skillsContainer = document.getElementById("skills-container");
    if(!skillsContainer){
        console.log("Skills container not found");
        return;
    }
    skillsContainer.innerHTML = "";

    skillsData.forEach(function(skill){
        const card = document.createElement("div");
        card.className = "text-center p-6";

        // Icon container with gradient background
        const iconBox = document.createElement("div");
        iconBox.className = "w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg";

        const iconText = document.createElement("span");
        iconText.className = "text-xl text-white font-bold";
        iconText.textContent = skill.shortLabel;

        iconBox.appendChild(iconText);

        // Skill name
        const skillName = document.createElement("h3");
        skillName.className = "text-lg font-bold mb-2 text-gray-900 dark:text-white";
        skillName.textContent = skill.name;

        // Skill description
        const skillDescription = document.createElement("p");
        skillDescription.className = "text-sm text-gray-600 dark:text-gray-400 leading-relaxed";
        skillDescription.textContent = skill.description;

        // Append all elements
        card.appendChild(iconBox);
        card.appendChild(skillName);
        card.appendChild(skillDescription);

        skillsContainer.appendChild(card);
    });

    console.log("Skills rendered successfully");
}