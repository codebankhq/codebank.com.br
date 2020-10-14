const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.nav__toggle');
const html = document.querySelector('html');
const menuLinks = menu.querySelectorAll('.nav__link');

let isMenuOpen = false;

function resetState () {
  isMenuOpen = !isMenuOpen;
  menu.hidden = !isMenuOpen;
  nav.classList.remove('nav--open');
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  html.style.overflowY = 'auto';
}

menuToggle.addEventListener('click', e => {
  e.preventDefault();
  isMenuOpen = !isMenuOpen;
  
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  menu.hidden = !isMenuOpen;
  nav.classList.toggle('nav--open');

  html.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    resetState();
  });
});

nav.addEventListener('keydown', e => {
  if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }
  
  if (e.keyCode === 9) {
    if (e.shiftKey) {
      if (document.activeElement === menuLinks[0]) {
        menuToggle.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === menuToggle) {
      menuLinks[0].focus();
      e.preventDefault();
    }
  }
});
