
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const instructions = document.getElementById("instructions");
const game = document.getElementById("game");
const result = document.getElementById("result");

const stimulus = document.getElementById("stimulus");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("finalScore");
const highScoreDisplay = document.getElementById("highScore");

let score = 0;
let timeLeft = 60;
let interval;
let currentColor = "";

function randomStimulus() {
    if (Math.random() < 0.5) {
        currentColor = "GREEN";
        stimulus.style.color = "green";
    } else {
        currentColor = "BLUE";
        stimulus.style.color = "blue";
    }
    stimulus.textContent = currentColor;
}

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = "Score: " + score;
    timerDisplay.textContent = "Time: " + timeLeft;

    instructions.classList.add("hidden");
    result.classList.add("hidden");
    game.classList.remove("hidden");

    randomStimulus();

    interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function checkAnswer(answer) {
    if ((currentColor === "GREEN" && answer === "LEFT") ||
        (currentColor === "BLUE" && answer === "RIGHT")) {
        score++;
    } else {
        score--;
    }

    scoreDisplay.textContent = "Score: " + score;
    randomStimulus();
}

function endGame() {
    clearInterval(interval);
    game.classList.add("hidden");
    result.classList.remove("hidden");

    finalScore.textContent = "Your Score: " + score;

    let highScore = localStorage.getItem("neuroHighScore") || 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("neuroHighScore", highScore);
    }

    highScoreDisplay.textContent = "High Score: " + highScore;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
leftBtn.addEventListener("click", () => checkAnswer("LEFT"));
rightBtn.addEventListener("click", () => checkAnswer("RIGHT"));
