document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const sections = Array.from(document.querySelectorAll('main [data-section]'));
  const sideLinks = Array.from(document.querySelectorAll('.side-rail-numbers a[data-target]'));
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[data-target]'));
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  function handleScroll() {
    // Fond plein sur le header au défilement
    if (window.scrollY > 40) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }

    // Détection de la section active pour le rail latéral et la nav
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

  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
  }
});