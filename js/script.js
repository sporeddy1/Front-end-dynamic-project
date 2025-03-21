document.addEventListener("DOMContentLoaded", () => {
    fetch('projects.json')  // Fetch the projects JSON file
        .then(response => response.json())
        .then(data => {
            const projectList = document.getElementById('project-list');
            const projectDisplay = document.getElementById('project-display');
            let batchSize = 20;  // Number of projects to load initially (you can adjust this)
            let startIndex = 0;

            // Function to load a batch of projects into the sidebar
            function loadProjects() {
                const endIndex = Math.min(startIndex + batchSize, data.length);
                for (let i = startIndex; i < endIndex; i++) {
                    const project = data[i];
                    const listItem = document.createElement('li');
                    listItem.textContent = project.title;
                    listItem.onclick = () => displayProject(project);
                    projectList.appendChild(listItem);
                }
                startIndex = endIndex;
            }

            // Initially load the first batch
            loadProjects();

            // Set up Intersection Observer to load more projects when scrolled to the bottom
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && startIndex < data.length) {
                    loadProjects(); // Load more projects when we reach the bottom
                }
            }, {
                rootMargin: '100px',
            });

            // Observe a dummy element to trigger loading more content
            const dummy = document.createElement('div');
            dummy.classList.add('dummy');
            projectList.appendChild(dummy);
            observer.observe(dummy);

            // Function to display the selected project
            function displayProject(project) {
                projectDisplay.innerHTML = '';  // Clear previous content

                const title = document.createElement('h1');
                title.textContent = project.title;

                const description = document.createElement('p');
                description.textContent = project.description;

                const iframe = document.createElement('iframe');
                iframe.src = project.file;
                iframe.width = "100%";
                iframe.height = "600px";

                projectDisplay.appendChild(title);
                projectDisplay.appendChild(description);
                projectDisplay.appendChild(iframe);
            }
        })
        .catch(error => {
            console.log('Error fetching JSON:', error);
        });
});
