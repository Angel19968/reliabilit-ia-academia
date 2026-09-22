// Nav scroll state + progress bar
const navbar = document.getElementById('navbar');
const progressFill = document.querySelector('.scroll-progress-fill');

function onScroll(){
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 8);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
  if (progressFill) progressFill.style.width = pct + '%';

  // active link highlight
  const sections = document.querySelectorAll('main section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (y >= top) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}
