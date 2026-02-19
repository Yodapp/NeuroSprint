
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const installBtn = document.getElementById("installBtn");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const result = document.getElementById("result");

const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const reactionEl = document.getElementById("reaction");
const bestReactionEl = document.getElementById("bestReaction");

const leftZone = document.getElementById("leftZone");
const rightZone = document.getElementById("rightZone");
const symbolEl = document.getElementById("symbol");

let score = 0;
let timeLeft = 60;
let interval;
let currentSymbol = "●";
let startTime;
let reactionTimes = [];

function randomSymbol() {
    currentSymbol = Math.random() < 0.5 ? "●" : "■";
    symbolEl.textContent = currentSymbol;
    startTime = Date.now();
}

function startGame() {
    score = 0;
    reactionTimes = [];
    timeLeft = 60;

    menu.classList.add("hidden");
    result.classList.add("hidden");
    game.classList.remove("hidden");

    scoreEl.textContent = "0";
    randomSymbol();

    interval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function checkAnswer(side) {
    const correct =
        (currentSymbol === "●" && side === "LEFT") ||
        (currentSymbol === "■" && side === "RIGHT");

    const reaction = Date.now() - startTime;
    reactionTimes.push(reaction);

    if (correct) score++;

    scoreEl.textContent = score;
    randomSymbol();
}

function endGame() {
    clearInterval(interval);
    game.classList.add("hidden");
    result.classList.remove("hidden");

    const avgReaction = Math.round(
        reactionTimes.reduce((a,b)=>a+b,0) / reactionTimes.length
    );

    finalScoreEl.textContent = score;
    reactionEl.textContent = "Genomsnittlig reaktionstid: " + avgReaction + " ms";

    let best = parseInt(localStorage.getItem("bestReaction")) || avgReaction;

    if (avgReaction < best) {
        best = avgReaction;
        localStorage.setItem("bestReaction", best);
    }

    bestReactionEl.textContent = "Bästa genomsnitt: " + best + " ms";
}

leftZone.addEventListener("click", () => checkAnswer("LEFT"));
rightZone.addEventListener("click", () => checkAnswer("RIGHT"));
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
