document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.main__page-title');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function moveTitle() {
    const x = getRandomInt(0, 20);
    const y = getRandomInt(0, 200);
    title.style.transform = `translate(${x}px, ${y}px)`;
  }

  setInterval(moveTitle, 1500); 
});