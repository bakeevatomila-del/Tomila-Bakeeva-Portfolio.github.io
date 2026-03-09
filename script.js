<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tomila Bakeeva | Project</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="header-brand">Tomila Bakeeva</a>

      <div class="header-right">
        <nav class="nav">
          <a href="index.html#portfolio" data-en="portfolio" data-de="portfolio">portfolio</a>
          <a href="index.html#about" data-en="about me" data-de="über mich">über mich</a>
          <a href="index.html#contact" data-en="contact" data-de="kontakt">kontakt</a>
        </nav>

        <div class="lang-switch" aria-label="Language switcher">
          <button class="lang-btn" data-lang="de" type="button">DE</button>
          <button class="lang-btn" data-lang="en" type="button">EN</button>
        </div>
      </div>
    </div>
  </header>

  <main class="section">
    <div class="container" id="project-page"></div>
  </main>

    <script>
    const projectData = {
      "skull-city": {
        title: "Skull City",
        subtitleDe: "IN ENTWICKLUNG",
        subtitleEn: "IN PROGRESS",
        image: "media/skull_city.png",
        descriptionDe: "Wird bald fertig...",
        descriptionEn: "Coming soon..."
      },
      "mushroom": {
        title: "Mushroom",
        subtitleDe: "3D Charakter / Stylized",
        subtitleEn: "3D Character / Stylized",
        image: "media/mushroom.png",
        descriptionDe: "In Blender erstellt",
        descriptionEn: "Created in Blender"
      },
      "controller": {
        title: "Controller",
        subtitleDe: "3D Render / Hard Surface",
        subtitleEn: "3D Render / Hard Surface",
        image: "media/console.png",
        descriptionDe: "In Blender erstellt",
        descriptionEn: "Created in Blender"
      },
      "character-work": {
        title: "Character Work",
        subtitleDe: "IN ENTWICKLUNG",
        subtitleEn: "IN PROGRESS",
        image: "media/character.png",
        descriptionDe: "Wird bald fertig...",
        descriptionEn: "Coming soon..."
      },
      "skull-sculpt": {
        title: "Skull Sculpt",
        subtitleDe: "Digital Sculpt / Studie",
        subtitleEn: "Digital Sculpt / Study",
        image: "media/skull.png",
        descriptionDe: "In ZBrush erstellt, mit Blender gerendert",
        descriptionEn: "Created in ZBrush, rendered in Blender"
      },
      "web-design-project": {
        title: "Web Site for CMC Claus",
        subtitleDe: "IN ENTWICKLUNG",
        subtitleEn: "IN PROGRESS",
        image: "media/website.png",
        descriptionDe: "Wird aktuell mit WordPress entwickelt",
        descriptionEn: "Currently being developed in WordPress"
      }
    };

    const projectOrder = [
      "skull-sculpt",
      "mushroom",
      "controller",
      "web-design-project",
      "skull-city",
      "character-work"
    ];

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("project");
    const project = projectData[slug];
    const container = document.getElementById("project-page");

    const langButtons = document.querySelectorAll(".lang-btn");
    const translatableElements = document.querySelectorAll("[data-en][data-de]");

    let currentLanguage = localStorage.getItem("site-language") || "de";

    function updateStaticTexts(lang) {
      document.documentElement.lang = lang;

      translatableElements.forEach((element) => {
        element.textContent = element.dataset[lang];
      });

      langButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === lang);
      });
    }

    function getNextProject(currentSlug) {
      const currentIndex = projectOrder.indexOf(currentSlug);

      if (currentIndex === -1) return null;

      const nextIndex = (currentIndex + 1) % projectOrder.length;
      const nextSlug = projectOrder[nextIndex];

      return {
        slug: nextSlug,
        ...projectData[nextSlug]
      };
    }

    function renderProject(lang) {
      if (!project) {
        container.innerHTML = `
          <div class="section-head section-head--stack">
            <div>
              <p class="section-label">${lang === "de" ? "projekt" : "project"}</p>
              <h1 style="margin:0;font-size:clamp(2.4rem,5vw,4.4rem);line-height:0.95;">
                ${lang === "de" ? "Projekt nicht gefunden" : "Project not found"}
              </h1>
            </div>
          </div>

          <p class="about-text">
            ${
              lang === "de"
                ? 'Zurück zum <a class="cv-link" href="index.html#portfolio">Portfolio</a>.'
                : 'Back to <a class="cv-link" href="index.html#portfolio">portfolio</a>.'
            }
          </p>
        `;
        return;
      }

      const subtitle = lang === "de" ? project.subtitleDe : project.subtitleEn;
      const description = lang === "de" ? project.descriptionDe : project.descriptionEn;
      const nextProject = getNextProject(slug);

      const nextProjectHtml = nextProject
        ? `
          <div class="next-project-wrap">
            <a class="next-project-link" href="project.html?project=${nextProject.slug}">
              <span class="next-project-label">
                ${lang === "de" ? "Nächstes Projekt" : "Next project"}
              </span>
              <span class="next-project-title">
                ${nextProject.title} →
              </span>
            </a>
          </div>
        `
        : "";

      container.innerHTML = `
        <div class="section-head section-head--stack">
          <div>
            <p class="section-label">${lang === "de" ? "projekt" : "project"}</p>
            <h1 style="margin:0;font-size:clamp(2.4rem,5vw,4.4rem);line-height:0.95;">
              ${project.title}
            </h1>
            <p style="margin-top:16px;color:var(--muted);">${subtitle}</p>
          </div>
        </div>

        <div class="project-image" style="border-radius:18px; overflow:hidden; margin-bottom:24px;">
          <img src="${project.image}" alt="${project.title}" />
        </div>

        <p class="about-text">${description}</p>

        ${nextProjectHtml}
      `;
    }

    function setLanguage(lang) {
      currentLanguage = lang;
      localStorage.setItem("site-language", lang);
      updateStaticTexts(lang);
      renderProject(lang);
    }

    langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
      });
    });

    setLanguage(currentLanguage);
  </script>
</body>
</html>
