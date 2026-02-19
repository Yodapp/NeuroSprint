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
const finalScoreEl = document.getElementById("finalScore");
const highScoreEl = document.getElementById("highScore");
const performanceText = document.getElementById("performanceText");
const comboDisplay = document.getElementById("combo");

let score = 0;
let timeLeft = 60;
let interval;
let combo = 0;
let gentleMode = false;
let currentSymbol = "🟢";

function randomStimulus() {
    currentSymbol = Math.random() < 0.5 ? "🟢" : "🔵";
    stimulus.textContent = currentSymbol;
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
    const correct =
        (currentSymbol === "🟢" && answer === "LEFT") ||
        (currentSymbol === "🔵" && answer === "RIGHT");

    if (correct) {
        score++;
        combo++;
        if (combo === 5) {
            comboDisplay.classList.remove("hidden");
            setTimeout(()=>comboDisplay.classList.add("hidden"),800);
        }
    } else {
        if (!gentleMode) score--;
        combo = 0;
    }

    updateUI();
    randomStimulus();
}

function endGame() {
    clearInterval(interval);
    game.classList.add("hidden");
    result.classList.remove("hidden");

    const finalScore = Math.max(score, 0); // never show negative final score
    finalScoreEl.textContent = finalScore;

    let highScore = parseInt(localStorage.getItem("neuroHighScore")) || 0;

    if (finalScore > highScore) {
        highScore = finalScore;
        localStorage.setItem("neuroHighScore", highScore);
    }

    highScoreEl.textContent = "Bästa poäng: " + highScore;

    if (finalScore > 40) {
        performanceText.textContent = "Fantastiskt fokus! 🌟";
    } else if (finalScore > 20) {
        performanceText.textContent = "Bra jobbat! 💪";
    } else {
        performanceText.textContent = "Fortsätt träna, du blir bättre varje dag ❤️";
    }
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
leftBtn.addEventListener("click", () => checkAnswer("LEFT"));
rightBtn.addEventListener("click", () => checkAnswer("RIGHT"));
