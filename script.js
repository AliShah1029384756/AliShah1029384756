const THEME_KEY = "ali-portfolio-theme";

function applyTheme(theme) {
  const resolved = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", resolved);

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.textContent = resolved === "light" ? "Dark Mode" : "Light Mode";
    toggle.setAttribute("aria-pressed", resolved === "light" ? "true" : "false");
  }
}

function setupThemeToggle() {
  const navContainer = document.querySelector(".nav-container");
  if (!navContainer) {
    return;
  }

  let initialTheme = localStorage.getItem(THEME_KEY);
  if (!initialTheme) {
    initialTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  applyTheme(initialTheme);

  let toggle = navContainer.querySelector(".theme-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.setAttribute("aria-label", "Toggle color mode");
    navContainer.insertBefore(toggle, document.querySelector(".nav-toggle") || null);
  }

  applyTheme(document.documentElement.getAttribute("data-theme"));

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.setAttribute("tabindex", "0");

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

setupThemeToggle();

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

function getCurrentPage() {
  const page = window.location.pathname.split("/").pop();
  return page || "index.html";
}

function updateActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinkElements = document.querySelectorAll(".nav-link");

  navLinkElements.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) {
      return;
    }

    const normalizedHref = href.replace("../", "");

    const isHomeMatch = (currentPage === "index.html" || currentPage === "") && normalizedHref === "index.html";
    const isDirectMatch = currentPage === normalizedHref;
    const isProjectGroupMatch = currentPage.endsWith(".html") && currentPage !== "projects.html" && normalizedHref === "projects.html" && window.location.pathname.includes("/projects/");

    if (isHomeMatch || isDirectMatch || isProjectGroupMatch) {
      link.classList.add("active");
    }
  });
}

updateActiveNavLink();

function createGlobalPageRail() {
  const nav = document.querySelector(".global-nav");
  if (!nav) {
    return;
  }

  const currentPage = getCurrentPage();
  const rail = document.createElement("div");
  rail.className = "page-rail";

  const links = [
    { href: "index.html", label: "Home" },
    { href: "projects.html", label: "Projects" },
    { href: "cv.html", label: "CV" },
    { href: "about.html", label: "About" },
    { href: "sites.html", label: "Sites" },
    { href: "logs.html", label: "Highlights" }
  ];

  const normalizeHref = (href) => {
    if (window.location.pathname.includes("/projects/")) {
      return `../${href}`;
    }
    return href;
  };

  rail.innerHTML = links.map((item) => {
    const isActive = currentPage === item.href;
    return `<a class="page-rail-link${isActive ? " active" : ""}" href="${normalizeHref(item.href)}">${item.label}</a>`;
  }).join("");

  nav.insertAdjacentElement("afterend", rail);
}

function createProjectSwitcher() {
  if (!window.location.pathname.includes("/projects/")) {
    return;
  }

  const header = document.querySelector(".project-header");
  if (!header) {
    return;
  }

  const projectPages = [
    { href: "educonnect.html", label: "EduConnect" },
    { href: "autismart.html", label: "AutiSmart" },
    { href: "clinicos.html", label: "ClinicOS" },
    { href: "schooliep.html", label: "SchoolIEP" },
    { href: "university.html", label: "University" },
    { href: "webtrack.html", label: "Web Track" }
  ];

  const current = getCurrentPage();
  const currentIndex = projectPages.findIndex((item) => item.href === current);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prev = projectPages[(safeIndex - 1 + projectPages.length) % projectPages.length];
  const next = projectPages[(safeIndex + 1) % projectPages.length];

  const switcher = document.createElement("section");
  switcher.className = "project-switcher";
  switcher.innerHTML = `
    <div class="project-switcher-top">
      <a class="project-switcher-nav" href="${prev.href}">← ${prev.label}</a>
      <a class="project-switcher-nav" href="../projects.html">All Projects</a>
      <a class="project-switcher-nav" href="${next.href}">${next.label} →</a>
    </div>
    <div class="project-switcher-links">
      ${projectPages.map((item) => `<a class="project-chip${item.href === current ? " active" : ""}" href="${item.href}">${item.label}</a>`).join("")}
    </div>
  `;

  header.insertAdjacentElement("afterend", switcher);
}

createGlobalPageRail();
createProjectSwitcher();

const revealTargets = document.querySelectorAll(".panel, .project-card, .project-item, .tech-category, .stat-card");
revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  el.style.animationDelay = `${Math.min(index * 40, 320)}ms`;
});

const filterButtons = document.querySelectorAll(".filter-btn");
if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ");
        const shouldShow = filter === "all" || tags.includes(filter);
        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });
}

const searchableProjects = document.querySelectorAll(".searchable-project");
const projectSearchInput = document.getElementById("project-search");
const projectTypeButtons = document.querySelectorAll("[data-project-filter]");
const projectResultsCount = document.getElementById("project-results-count");
const projectFilterReset = document.getElementById("project-filter-reset");

if (searchableProjects.length && projectSearchInput && projectTypeButtons.length) {
  let activeType = "all";

  const applyProjectFilters = () => {
    const query = projectSearchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    searchableProjects.forEach((project) => {
      const type = project.dataset.type || "";
      const text = (project.dataset.text || project.textContent || "").toLowerCase();
      const typeMatch = activeType === "all" || type === activeType;
      const queryMatch = query.length === 0 || text.includes(query);
      const shouldShow = typeMatch && queryMatch;

      project.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (projectResultsCount) {
      projectResultsCount.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown`;
    }
  };

  projectTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeType = button.dataset.projectFilter || "all";
      projectTypeButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      applyProjectFilters();
    });
  });

  projectSearchInput.addEventListener("input", applyProjectFilters);

  if (projectFilterReset) {
    projectFilterReset.addEventListener("click", () => {
      activeType = "all";
      projectSearchInput.value = "";
      projectTypeButtons.forEach((btn) => {
        btn.classList.toggle("active", (btn.dataset.projectFilter || "") === "all");
      });
      applyProjectFilters();
      projectSearchInput.focus();
    });
  }

  applyProjectFilters();
}

function createScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  const update = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll <= 0 ? 0 : (window.scrollY / maxScroll) * 100;
    bar.style.width = `${Math.min(progress, 100)}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function createFloatingDock() {
  const pages = ["index.html", "projects.html", "cv.html", "about.html", "sites.html"];
  const labels = {
    "index.html": "Home",
    "projects.html": "Projects",
    "cv.html": "CV",
    "about.html": "About",
    "sites.html": "Sites"
  };

  const current = getCurrentPage();
  const currentIndex = pages.indexOf(current);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prev = pages[(safeIndex - 1 + pages.length) % pages.length];
  const next = pages[(safeIndex + 1) % pages.length];
  const normalizePageHref = (page) => (window.location.pathname.includes("/projects/") ? `../${page}` : page);

  const dock = document.createElement("div");
  dock.className = "floating-dock";
  dock.innerHTML = `
    <a href="${normalizePageHref(prev)}" aria-label="Previous page">← ${labels[prev]}</a>
    <button type="button" data-open-commands="true">Shortcuts</button>
    <a href="${normalizePageHref(next)}" aria-label="Next page">${labels[next]} →</a>
  `;

  document.body.appendChild(dock);
}

function createCommandOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "command-overlay";
  overlay.innerHTML = `
    <div class="command-panel" role="dialog" aria-modal="true" aria-label="Quick shortcuts">
      <h3>Quick Commands</h3>
      <div class="command-list">
        <div class="command-item"><span>Open Home</span><kbd>Alt+1</kbd></div>
        <div class="command-item"><span>Open Projects</span><kbd>Alt+2</kbd></div>
        <div class="command-item"><span>Open CV</span><kbd>Alt+3</kbd></div>
        <div class="command-item"><span>Open About</span><kbd>Alt+4</kbd></div>
        <div class="command-item"><span>Open Sites</span><kbd>Alt+5</kbd></div>
        <div class="command-item"><span>Open this panel</span><kbd>?</kbd></div>
        <div class="command-item"><span>Close panel</span><kbd>Esc</kbd></div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeOverlay = () => overlay.classList.remove("active");
  const openOverlay = () => overlay.classList.add("active");

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.openCommands === "true") {
      openOverlay();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
    }

    if (event.key === "?" && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      openOverlay();
    }

    if (event.altKey) {
      const shortcuts = {
        "1": "index.html",
        "2": "projects.html",
        "3": "cv.html",
        "4": "about.html",
        "5": "sites.html"
      };

      const targetPage = shortcuts[event.key];
      if (targetPage) {
        const normalizedTarget = window.location.pathname.includes("/projects/") ? `../${targetPage}` : targetPage;
        window.location.href = normalizedTarget;
      }
    }
  });
}

createScrollProgress();
createFloatingDock();
createCommandOverlay();

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput && terminalOutput) {
  terminalInput.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') {
      return;
    }

    const command = terminalInput.value.toLowerCase().trim();
    let response = '';

    if (command === 'projects') {
      response = '<p>> Loading projects...</p>' +
        '<ul>' +
          '<li><a href="projects/autismart.html" style="color:#4ade80;">AutiSmart (FYP - Private)</a></li>' +
          '<li><a href="projects/university.html" style="color:#60a5fa;">University Portfolio (Compiler + Systems)</a></li>' +
        '</ul>';
    } else if (command === 'contact') {
      response = '<p>> Email: <a href="mailto:shahyed99@gmail.com" style="color:#facc15;">shahyed99@gmail.com</a></p>' +
        '<p>> GitHub: <a href="https://github.com/AliShah1029384756" style="color:#facc15;">AliShah1029384756</a></p>';
    } else if (command === 'help') {
      response = '<p>> Available commands: <strong>projects, contact, help, clear</strong></p>';
    } else if (command === 'clear') {
      terminalOutput.innerHTML = '';
      terminalInput.value = '';
      return;
    } else {
      response = '<p style="color:#f87171;">> Command not found: ' + command + '. Type \'help\' for available commands.</p>';
    }

    terminalOutput.innerHTML += '<p><span>guest@alishah:~$</span> ' + command + '</p>' + response;
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });
}

