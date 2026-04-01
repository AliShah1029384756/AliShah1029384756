// Rotate lead text
const rotatingLead = document.getElementById('rotating-lead');
const phrases = [
  'Student Plus Coder: building web apps, systems projects, and practical CS learning resources.',
  'Focused on clean code, clear docs, and steady weekly improvement.',
  'Learning in public with honest progress and strong fundamentals.'
];

let phraseIndex = 0;
setInterval(() => {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  rotatingLead.style.opacity = '0.3';
  setTimeout(() => {
    rotatingLead.textContent = phrases[phraseIndex];
    rotatingLead.style.opacity = '1';
  }, 180);
}, 3200);

// Interactive project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const link = card.dataset.link;
    if (link) window.open(link, '_blank');
  });
  
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const link = card.dataset.link;
      if (link) window.open(link, '_blank');
    }
  });
  
  card.setAttribute('tabindex', '0');
});

// Smooth transitions
requestAnimationFrame(() => {
  rotatingLead.style.transition = 'opacity 0.18s ease';
});


// Navigation menu toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Update active nav link
function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinkElements = document.querySelectorAll('.nav-link');
  
  navLinkElements.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    // Handle homepage
    if ((currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('AliShah1029384756/')) && href === '/') {
      link.classList.add('active');
    }
    // Handle other pages
    else if (href && href !== '/' && currentPath.includes(href.replace('/', ''))) {
      link.classList.add('active');
    }
  });
}

// Set active link on page load
updateActiveNavLink();

// Close mobile menu when a link is clicked
if (navLinks) {
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}
