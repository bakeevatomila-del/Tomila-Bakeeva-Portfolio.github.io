const projects = [
  {
    slug: "skull-sculpt",
    title: "Skull Sculpt",
    category: "3d",
    image: "media/skull.png",
    textDe: "Digital Sculpt / Studie",
    textEn: "Digital Sculpt / Study"
  }, 

  {
    slug: "mushroom",
    title: "Mushroom",
    category: "3d",
    image: "media/mushroom.png",
    textDe: "3D Charakter / Stylized",
    textEn: "3D Charakter / Stylized"
  },

  {
    slug: "controller",
    title: "Controller",
    category: "3d",
    image: "media/console.png",
    textDe: "3D Render / Hard Surface",
    textEn: "3D Render / Hard Surface"
  },

  {
    slug: "web-design-project",
    title: "Web Site, CMC Claus",
    category: "web",
    image: "media/website.png",
    textDe: "IN ENTWICKLUNG: Webdesign / Illustrationen",
    textEn: "IN PROGRESS: Web Design / Illustrations"
  },

  {
    slug: "skull-city",
    title: "Skull City",
    category: "3d",
    image: "media/skull_city.png",
    textDe: "IN ENTWICKLUNG: 3D-Konzept / Environment",
    textEn: "IN PROGRESS: 3D Concept / Environment"
  },
  
  {
    slug: "character-work",
    title: "Character Work",
    category: "3d",
    image: "media/character.png",
    textDe: "IN ENTWICKLUNG: 3D-Charakter",
    textEn: "IN PROGRESS: 3D Character"
  },
  
];

const langButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-en][data-de]");
const projectsGrid = document.getElementById("projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentLanguage = localStorage.getItem("site-language") || "de";
let currentFilter = "all";

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[lang];
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("site-language", lang);

  if (projectsGrid) {
    renderProjects();
  }
}

function createProjectCard(project) {
  const text = currentLanguage === "de" ? project.textDe : project.textEn;

  return `
    <article class="project-card" data-category="${project.category}">
      <a href="project.html?project=${project.slug}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" />
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${text}</p>
        </div>
      </a>
    </article>
  `;
}

function renderProjects() {
  if (!projectsGrid) return;

  const filteredProjects =
    currentFilter === "all"
      ? projects
      : projects.filter((project) => project.category === currentFilter);

  projectsGrid.innerHTML = filteredProjects.map(createProjectCard).join("");
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      renderProjects();
    });
  });
}

setLanguage(currentLanguage);
