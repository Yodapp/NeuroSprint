const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const gentleToggle = document.getElementById("gentleToggle");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const result = document.getElementById("result");

const stimulus = document.getElementById("stimulus");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("finalScore");
const highScoreDisplay = document.getElementById("highScore");
const comboDisplay = document.getElementById("combo");

let score = 0;
let timeLeft = 60;
let interval;
let currentColor = "";
let combo = 0;
let gentleMode = false;

function randomStimulus() {
    currentColor = Math.random() < 0.5 ? "GRÖN" : "BLÅ";
    stimulus.textContent = currentColor;
    stimulus.style.color = currentColor === "GRÖN" ? "green" : "blue";
}

function startGame() {
    gentleMode = gentleToggle.checked;
    score = 0;
    combo = 0;
    timeLeft = gentleMode ? 90 : 60;

    menu.classList.add("hidden");
    result.classList.add("hidden");
    game.classList.remove("hidden");

    updateUI();
    randomStimulus();

    interval = setInterval(() => {
        timeLeft--;
        updateUI();
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function updateUI() {
    scoreDisplay.textContent = "Poäng: " + score;
    timerDisplay.textContent = "Tid: " + timeLeft;
}

function checkAnswer(answer) {
    const correct = (currentColor === "GRÖN" && answer === "VÄNSTER") ||
                    (currentColor === "BLÅ" && answer === "HÖGER");

    if (correct) {
        score++;
        combo++;
        if (combo === 5) showCombo();
    } else {
        if (!gentleMode) score--;
        combo = 0;
    }

    stimulus.style.transform = "scale(1.1)";
    setTimeout(() => stimulus.style.transform = "scale(1)", 150);

    updateUI();
    randomStimulus();
}

function showCombo() {
    comboDisplay.classList.remove("hidden");
    setTimeout(() => comboDisplay.classList.add("hidden"), 800);
}

function endGame() {
    clearInterval(interval);
    game.classList.add("hidden");
    result.classList.remove("hidden");

    finalScore.textContent = "Din poäng: " + score;

    let highScore = localStorage.getItem("neuroHighScore") || 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("neuroHighScore", highScore);
    }

    highScoreDisplay.textContent = "Bästa poäng: " + highScore;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
leftBtn.addEventListener("click", () => checkAnswer("VÄNSTER"));
rightBtn.addEventListener("click", () => checkAnswer("HÖGER"));
