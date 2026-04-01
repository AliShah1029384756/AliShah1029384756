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
