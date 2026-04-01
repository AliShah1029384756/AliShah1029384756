const roleLine = document.querySelector('.lead');
const phrases = [
  'Student Plus Coder: building web apps, systems projects, and practical CS learning resources.',
  'Focused on clean code, clear docs, and steady weekly improvement.',
  'Learning in public with honest progress and strong fundamentals.'
];

let i = 0;
setInterval(() => {
  i = (i + 1) % phrases.length;
  roleLine.style.opacity = '0.2';
  setTimeout(() => {
    roleLine.textContent = phrases[i];
    roleLine.style.opacity = '1';
  }, 180);
}, 2600);
