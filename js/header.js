document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // Scroll down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scroll up
      header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
  });
  window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
  });
});