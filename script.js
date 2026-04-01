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

