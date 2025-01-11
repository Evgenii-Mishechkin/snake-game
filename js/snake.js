document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const scoreElement = document.getElementById("score");
  canvas.width = 400;
  canvas.height = 400;

  const grid = 20;
  let snake = [{ x: grid * 2, y: grid * 2 }];
  let direction = { x: 0, y: 0 };
  let food = {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
  };
  let score = 0;
  let gameInterval;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw snake
		ctx.fillStyle = "rgba(0, 211, 0, 0.6)"; // Зеленый цвет с прозрачностью
		snake.forEach((segment) =>
			ctx.fillRect(segment.x, segment.y, grid - 2, grid - 2)
		);

		// Draw food
		ctx.fillStyle = "rgba(211, 0, 0, 0.6)"; // Красный цвет с прозрачностью
		ctx.beginPath();
		ctx.arc(food.x + grid / 2, food.y + grid / 2, (grid - 2) / 2, 0, 2 * Math.PI);
		ctx.fill();

    // Draw grid border
    ctx.strokeStyle = "#333";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  function update() {
    const head = {
      x: snake[0].x + direction.x * grid,
      y: snake[0].y + direction.y * grid,
    };

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreElement.innerText = score;
      food = {
        x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
        y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
      };
    } else {
      snake.pop();
    }

    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height ||
      snake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      )
    ) {
      clearInterval(gameInterval);
      alert(`Game Over! Your score was: ${score}`);
      document.location.reload();
    }

    snake.unshift(head);
    draw();
  }

  function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === "ArrowUp" && direction.y === 0) {
      direction = { x: 0, y: -1 };
    } else if (keyPressed === "ArrowDown" && direction.y === 0) {
      direction = { x: 0, y: 1 };
    } else if (keyPressed === "ArrowLeft" && direction.x === 0) {
      direction = { x: -1, y: 0 };
    } else if (keyPressed === "ArrowRight" && direction.x === 0) {
      direction = { x: 1, y: 0 };
    }
  }

  function handleControlButtonClick(event) {
    const buttonId = event.target.id;
    if (buttonId === "up" && direction.y === 0) {
      direction = { x: 0, y: -1 };
    } else if (buttonId === "down" && direction.y === 0) {
      direction = { x: 0, y: 1 };
    } else if (buttonId === "left" && direction.x === 0) {
      direction = { x: -1, y: 0 };
    } else if (buttonId === "right" && direction.x === 0) {
      direction = { x: 1, y: 0 };
    }
  }

  document.addEventListener("keydown", changeDirection);
  document.getElementById("up").addEventListener("click", handleControlButtonClick);
  document.getElementById("down").addEventListener("click", handleControlButtonClick);
  document.getElementById("left").addEventListener("click", handleControlButtonClick);
  document.getElementById("right").addEventListener("click", handleControlButtonClick);

  gameInterval = setInterval(update, 150); // Update game every 150ms
});