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

// Scroll-reveal for elements marked .reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Animated counters (e.g. "6" áreas, "20+" herramientas)
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(animateCounter);
  }
}

// Typewriter effect on the hero terminal mock
const typedEl = document.getElementById('typedPrompt');
const responseEl = document.getElementById('termResponse');
if (typedEl) {
  const fullText = 'Analiza las fallas de la bomba B-102 y dime qué activo priorizar';
  let i = 0;
  function typeNext() {
    if (i <= fullText.length) {
      typedEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeNext, 28);
    } else if (responseEl) {
      setTimeout(() => responseEl.classList.add('show'), 300);
    }
  }
  if ('IntersectionObserver' in window) {
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeNext();
          termObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    termObserver.observe(typedEl.closest('.hero-terminal'));
  } else {
    typeNext();
  }
}

// Flip cards: click/keyboard toggles between front and back content
document.querySelectorAll('.flip-card').forEach(card => {
  const front = card.querySelector('.flip-content');
  const back = card.querySelector('.flip-back');
  if (!front || !back) return;
  const flip = () => {
    card.classList.add('flipping');
    setTimeout(() => {
      front.hidden = !front.hidden;
      back.hidden = !back.hidden;
      card.classList.remove('flipping');
    }, 160);
  };
  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
  });
});
