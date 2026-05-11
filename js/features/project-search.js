function searchProjects() {
    const projectsContainer = document.getElementById("projects-container");
    const searchInput = document.getElementById("project-search");
    const sortSelect = document.getElementById("project-sort");
    const filtersContainer = document.getElementById("project-filters");
    const countDisplay = document.getElementById("project-count");

    if (!projectsContainer) return;

    let currentCategory = "All";
    let searchQuery = "";
    let currentSort = "default";

    // 1. Generate category buttons
    const categories = ["All", ...new Set(projectsData.map(p => p.category))];
    
    filtersContainer.innerHTML = "";
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.className = `px-4 py-2 rounded-full font-bold transition-colors ${category === "All" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`;
        btn.textContent = category;
        btn.addEventListener("click", () => {
            currentCategory = category;
            
            // Update active state
            Array.from(filtersContainer.children).forEach(child => {
                child.className = `px-4 py-2 rounded-full font-bold transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300`;
            });
            btn.className = `px-4 py-2 rounded-full font-bold transition-colors bg-blue-600 text-white`;
            
            renderProjects();
        });
        filtersContainer.appendChild(btn);
    });

    // 2. Event Listeners for Search and Sort
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProjects();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderProjects();
        });
    }

    // 3. Render Projects Function
    function renderProjects() {
        projectsContainer.innerHTML = "";
        
        // Filter
        let filtered = projectsData.filter(project => {
            const matchesCategory = currentCategory === "All" || project.category === currentCategory;
            const matchesSearch = project.name.toLowerCase().includes(searchQuery) || project.description.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        // Sort
        if (currentSort === "a-z") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === "z-a") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            // Restore default sorting by ID
            filtered.sort((a, b) => a.id - b.id);
        }

        // Update Count
        if (countDisplay) {
            countDisplay.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`;
        }

        // Build HTML
        filtered.forEach(project => {
            const card = document.createElement("div");
            card.className = "p-6 text-center cursor-pointer group";
            
            // Handle Recently Viewed Storage
            card.addEventListener("click", () => {
                let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                // remove if already exists to move it to the top
                viewed = viewed.filter(id => id !== project.id);
                viewed.unshift(project.id);
                // Keep only last 3
                if (viewed.length > 3) viewed.pop();
                localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
            });

            const iconBox = document.createElement("div");
            iconBox.className = "w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200";
            const iconText = document.createElement("span");
            iconText.className = "text-2xl text-white font-bold";
            iconText.textContent = project.id;
            iconBox.appendChild(iconText);

            const projectName = document.createElement("h3");
            projectName.className = "text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors";
            projectName.textContent = project.name;

            const projectCategory = document.createElement("span");
            projectCategory.className = "inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-3";
            projectCategory.textContent = project.category;

            // Expand/Collapse Description
            const descContainer = document.createElement("div");
            descContainer.className = "mb-4 text-sm text-gray-600 dark:text-gray-400";

            const shortDesc = project.description.length > 60 ? project.description.slice(0, 60) + "..." : project.description;
            const descText = document.createElement("p");
            descText.textContent = shortDesc;
            descContainer.appendChild(descText);

            if (project.description.length > 60) {
                const toggleBtn = document.createElement("button");
                toggleBtn.textContent = "View More";
                toggleBtn.className = "text-blue-500 dark:text-blue-400 font-medium mt-1 hover:underline text-xs transition-colors";

                let isExpanded = false;
                toggleBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    isExpanded = !isExpanded;
                    descText.textContent = isExpanded ? project.description : shortDesc;
                    toggleBtn.textContent = isExpanded ? "View Less" : "View More";
                });
                descContainer.appendChild(toggleBtn);
            }

            const techSpan = document.createElement("div");
            techSpan.className = "mb-4 flex flex-wrap justify-center gap-2";
            if (project.technologies) {
                project.technologies.forEach(tech => {
                    const t = document.createElement("span");
                    t.className = "px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
                    t.textContent = tech;
                    techSpan.appendChild(t);
                });
            }

            const projectStatus = document.createElement("span");
            projectStatus.className = "inline-block px-3 py-1 text-xs font-bold uppercase rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
            projectStatus.textContent = project.status;

            card.appendChild(iconBox);
            card.appendChild(projectName);
            card.appendChild(projectCategory);
            card.appendChild(descContainer);
            card.appendChild(techSpan);
            card.appendChild(projectStatus);

            projectsContainer.appendChild(card);
        });
    }

    // Initial render
    renderProjects();
}
searchProjects();