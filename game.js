const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gentleToggle = document.getElementById("gentleToggle");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const result = document.getElementById("result");

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const highScoreEl = document.getElementById("highScore");

const leftZone = document.getElementById("leftZone");
const rightZone = document.getElementById("rightZone");
const symbolEl = document.getElementById("symbol");

let score = 0;
let timeLeft = 60;
let interval;
let gentleMode = false;
let currentType = "circle";

function randomSymbol() {
    currentType = Math.random() < 0.5 ? "circle" : "square";
    symbolEl.className = "symbol " + currentType;
}

function startGame() {
    gentleMode = gentleToggle.checked;
    score = 0;
    timeLeft = gentleMode ? 90 : 60;

    menu.classList.add("hidden");
    result.classList.add("hidden");
    game.classList.remove("hidden");

    updateUI();
    randomSymbol();

    interval = setInterval(() => {
        timeLeft--;
        updateUI();
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function updateUI() {
    timerEl.textContent = "Tid: " + timeLeft;
    scoreEl.textContent = "Poäng: " + score;
}

function checkAnswer(side) {
    const correct =
        (currentType === "circle" && side === "LEFT") ||
        (currentType === "square" && side === "RIGHT");

    if (correct) {
        score++;
    } else {
        if (!gentleMode) score--;
    }

    updateUI();
    randomSymbol();
}

function endGame() {
    clearInterval(interval);
    game.classList.add("hidden");
    result.classList.remove("hidden");

    const finalScore = Math.max(score, 0);
    finalScoreEl.textContent = finalScore;

    let highScore = parseInt(localStorage.getItem("neuroHighScore")) || 0;
    if (finalScore > highScore) {
        highScore = finalScore;
        localStorage.setItem("neuroHighScore", highScore);
    }

    highScoreEl.textContent = "Bästa poäng: " + highScore;
}

leftZone.addEventListener("click", () => checkAnswer("LEFT"));
rightZone.addEventListener("click", () => checkAnswer("RIGHT"));
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
