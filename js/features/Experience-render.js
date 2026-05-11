function ExperienceView(){
    const experienceContainer = document.getElementById("experience-container");
    if(!experienceContainer){
        console.log("experience not found");
        return;
    }
    experienceContainer.innerHTML = "";

    experiencesData.forEach(function(experience, index){
        const card = document.createElement("div");
        card.className = "relative pl-8 pb-8";

        // Timeline dot
        const timelineDot = document.createElement("div");
        timelineDot.className = "absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md";
        card.appendChild(timelineDot);

        // Timeline line (except for last item)
        if (index < experiencesData.length - 1) {
            const timelineLine = document.createElement("div");
            timelineLine.className = "absolute left-2 top-4 w-0.5 h-full bg-gray-300 dark:bg-gray-600";
            card.appendChild(timelineLine);
        }

        const content = document.createElement("div");
        content.className = "ml-6";

        const header = document.createElement("div");
        header.className = "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2";

        const title = document.createElement("h3");
        title.className = "text-xl font-bold text-gray-900 dark:text-white";
        title.textContent = experience.study;

        const score = document.createElement("span");
        score.className = "text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full";
        score.textContent = experience.CGPA;

        header.appendChild(title);
        header.appendChild(score);

        const institution = document.createElement("p");
        institution.className = "text-lg text-gray-600 dark:text-gray-400 font-medium mb-2";
        institution.textContent = experience.college;

        const type = document.createElement("p");
        type.className = "text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wide";
        type.textContent = experience.label;

        content.appendChild(header);
        content.appendChild(institution);
        content.appendChild(type);
        card.appendChild(content);

        experienceContainer.appendChild(card);
    });

    console.log("Experience rendered successfully");
}