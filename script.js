// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 }; // Start moving right
let food = spawnFood();
let gameInterval;
let isPaused = false;

// Draw the game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "#2E7D32";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });

    // Draw food
    ctx.fillStyle = "#D50000";
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Move the snake
function updateGame() {
    if (isPaused) return;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Game over if snake hits the wall or itself
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert("Game Over!");
        restartGame();
        return;
    }

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        food = spawnFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// Spawn food at a random location
function spawnFood() {
    const x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    const y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    return { x, y };
}

// Restart the game
function restartGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 20, y: 0 }; // Reset direction to right
    food = spawnFood();
    isPaused = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 200); // Slower interval: 200ms
}

// Pause the game
document.getElementById("pauseButton").addEventListener("click", () => {
    isPaused = !isPaused;
});

// Restart the game
document.getElementById("restartButton").addEventListener("click", restartGame);

// Handle keyboard input
document.addEventListener("keydown", event => {
    const key = event.key;
    if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20 };
    else if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20 };
    else if (key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0 };
    else if (key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0 };
});

// Start the game
restartGame();
