document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = Array.from(document.querySelectorAll('main [data-section]'));
  const sideLinks = Array.from(document.querySelectorAll('.side-rail-numbers a[data-target]'));
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Gestion du menu burger mobile
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      const isOpen = header.classList.toggle('nav-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fermeture automatique au clic sur un lien du menu
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Détection du scroll pour la barre transparente/pleine et les liens actifs
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }

    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentId = null;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('data-section');
      }
    });

    if (currentId) {
      sideLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('data-target') === currentId);
      });
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('data-target') === currentId);
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});