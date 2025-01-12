document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.main__home-title');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Function to randomly move the title element
  function moveTitle() {
    let x, y;
    if (window.innerWidth <= 425) {
      x = getRandomInt(0, 0);
      y = getRandomInt(0, 100);
    } else {
      x = getRandomInt(0, 20);
      y = getRandomInt(0, 200);
    }
    title.style.transform = `translate(${x}px, ${y}px)`;
  }
  moveTitle();
  setInterval(moveTitle, 1500); 
});