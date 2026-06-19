/* ============================================
   BambuSkin Lab — JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initCounters();
  initCircleCharts();
  initBarCharts();
  initSmoothScroll();
  initQRCode();
});

/* URL pública del sitio — cámbiala cuando subas a GitHub */
const SITE_URL = 'https://jairopotosme.github.io/Web_BambuSkin.github.io/';

function getPageUrl() {
  const hostname = window.location.hostname;

  /* Si ya está en GitHub Pages, usar la URL real */
  if (hostname.includes('github.io')) {
    return window.location.href.split('#')[0];
  }

  /* En PC local (archivo o Live Server), usar siempre la URL pública */
  return SITE_URL;
}

/* ---- Navigation ---- */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---- Animated Counters ---- */
function initCounters() {
  const sections = ['estadisticas', 'mercado'];
  const animatedSections = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedSections.has(entry.target.id)) {
        animatedSections.add(entry.target.id);
        entry.target.querySelectorAll('.counter').forEach(counter => {
          animateCounter(counter);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = isDecimal ? target.toFixed(1) : target;
    }
  }

  requestAnimationFrame(update);
}

/* ---- Circle Charts ---- */
function initCircleCharts() {
  const circles = document.querySelectorAll('.stat-card__circle-fill');
  const circumference = 2 * Math.PI * 54;
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        circles.forEach(circle => {
          const percent = parseFloat(circle.dataset.percent);
          const offset = circumference - (percent / 100) * circumference;
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, 300);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('estadisticas');
  if (statsSection) observer.observe(statsSection);
}

/* ---- Bar Charts ---- */
function initBarCharts() {
  const bars = document.querySelectorAll('.bar-chart__fill');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        bars.forEach((bar, index) => {
          const width = bar.dataset.width;
          setTimeout(() => {
            bar.style.width = width + '%';
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('estadisticas');
  if (statsSection) observer.observe(statsSection);
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---- Parallax on Hero ---- */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero__bg-img');
  if (hero && window.innerWidth > 768) {
    const scrolled = window.scrollY;
    hero.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
  }
});

/* ---- Gallery Lightbox Effect ---- */
document.querySelectorAll('.galeria__item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
      item.style.transform = '';
    }, 200);
  });
});

/* ---- QR Code Generator ---- */
function initQRCode() {
  const container = document.getElementById('qrcode');
  const urlText = document.getElementById('qr-url-text');
  const downloadBtn = document.getElementById('qr-download');
  const notice = document.getElementById('qr-notice');

  if (!container || typeof QRCode === 'undefined') return;

  const pageUrl = getPageUrl();
  const isPublished = window.location.hostname.includes('github.io');

  urlText.textContent = pageUrl;

  if (isPublished && notice) {
    notice.className = 'qr__notice qr__notice--live';
    notice.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Tu sitio está publicado. Escanea el QR para abrirlo en cualquier dispositivo.</span>';
  }

  new QRCode(container, {
    text: pageUrl,
    width: 220,
    height: 220,
    colorDark: '#1b4332',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.addEventListener('click', () => {
    const img = container.querySelector('img');
    const canvas = container.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'bambuskin-lab-qr.png';

    if (img && img.src) {
      link.href = img.src;
    } else if (canvas) {
      link.href = canvas.toDataURL('image/png');
    } else {
      return;
    }

    link.click();
  });
}
