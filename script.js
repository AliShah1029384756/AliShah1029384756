const rotatingLead = document.getElementById("rotating-lead");

if (rotatingLead) {
  const phrases = [
    "Portfolio focused on full-stack systems and education-impact solutions.",
    "Focused on architecture quality, clean code, and reliable engineering standards.",
    "Building practical systems with strong fundamentals and long-term maintainability."
  ];

  let phraseIndex = 0;
  rotatingLead.style.transition = "opacity 0.18s ease";

  setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    rotatingLead.style.opacity = "0.35";
    setTimeout(() => {
      rotatingLead.textContent = phrases[phraseIndex];
      rotatingLead.style.opacity = "1";
    }, 180);
  }, 3200);
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
  const pages = ["index.html", "projects.html", "cv.html", "about.html"];
  const labels = {
    "index.html": "Home",
    "projects.html": "Projects",
    "cv.html": "CV",
    "about.html": "About"
  };

  const current = getCurrentPage();
  const currentIndex = pages.indexOf(current);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prev = pages[(safeIndex - 1 + pages.length) % pages.length];
  const next = pages[(safeIndex + 1) % pages.length];

  const dock = document.createElement("div");
  dock.className = "floating-dock";
  dock.innerHTML = `
    <a href="${prev}" aria-label="Previous page">← ${labels[prev]}</a>
    <button type="button" data-open-commands="true">Shortcuts</button>
    <a href="${next}" aria-label="Next page">${labels[next]} →</a>
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
        "4": "about.html"
      };

      const targetPage = shortcuts[event.key];
      if (targetPage) {
        window.location.href = targetPage;
      }
    }
  });
}

createScrollProgress();
createFloatingDock();
createCommandOverlay();

