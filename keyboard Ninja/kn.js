const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const gameOverEl = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");

let score = 0;
let lives = 3;
let speed = 3000; // speed in ms

function spawnLetter() {
  const letter = document.createElement("div");
  const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  letter.textContent = char;
  letter.classList.add("letter");
  letter.style.left = `${Math.random() * 90}%`;
  game.appendChild(letter);

  // Animate falling letter
  letter.style.animationDuration = speed / 1000 + "s";

  // Remove after animation ends
  const timeout = setTimeout(() => {
    if (game.contains(letter)) {
      game.removeChild(letter);
      loseLife();
    }
  }, speed);

  letter.dataset.char = char;
  letter.dataset.timeout = timeout;
}

// Spawn a new letter every 1.5 seconds
let letterInterval = setInterval(spawnLetter, 1500);

function loseLife() {
  lives--;
  livesEl.textContent = `Lives: ${lives}`;
  if (lives <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(letterInterval);
  document.removeEventListener("keydown", keyHandler);
  finalScoreEl.textContent = score;
  gameOverEl.classList.remove("hidden");
}

function restartGame() {
  score = 0;
  lives = 3;
  speed = 3000;
  scoreEl.textContent = `Score: ${score}`;
  livesEl.textContent = `Lives: ${lives}`;
  game.innerHTML = "";
  gameOverEl.classList.add("hidden");
  letterInterval = setInterval(spawnLetter, 1500);
  document.addEventListener("keydown", keyHandler);
}

function keyHandler(e) {
  const pressed = e.key.toUpperCase();
  const letters = document.querySelectorAll(".letter");

  letters.forEach(letter => {
    if (letter.textContent === pressed) {
      clearTimeout(letter.dataset.timeout);
      game.removeChild(letter);
      score++;
      scoreEl.textContent = `Score: ${score}`;

      // Increase difficulty
      if (score % 10 === 0 && speed > 1000) {
        speed -= 200;
      }
    }
  });
}

document.addEventListener("keydown", keyHandler);
