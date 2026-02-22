
let score, round, totalRounds = 20;
let currentSymbol, locked;
let startTime;
let times;

function init(){
document.getElementById("startBtn").onclick = startGame;
document.getElementById("restartBtn").onclick = startGame;
document.getElementById("leftHalf").onclick = () => choose('left');
document.getElementById("rightHalf").onclick = () => choose('right');
}

function showScreen(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function startGame(){
score=0; round=0; times=[];
document.getElementById("score").textContent=0;
document.getElementById("progressBar").style.width="0%";
showScreen("gameScreen");
nextRound();
}

function nextRound(){
if(round>=totalRounds){ endGame(); return; }
round++;
document.getElementById("roundText").textContent="Runda "+round+" av "+totalRounds;
document.getElementById("progressBar").style.width=(round/totalRounds*100)+"%";
currentSymbol = Math.random()>0.5 ? "●" : "■";
document.getElementById("symbol").textContent=currentSymbol;
startTime = performance.now();
locked=false;
}

function choose(side){
if(locked) return;
locked=true;

let reaction = performance.now() - startTime;
times.push(reaction);

let correct = (currentSymbol==="●" && side==="left") ||
              (currentSymbol==="■" && side==="right");

if(correct){
score++;
document.getElementById("score").textContent=score;
}

setTimeout(nextRound,150);
}

function formatTime(ms){
if(ms < 1000) return Math.round(ms) + " ms";
return (ms/1000).toFixed(1).replace('.',',') + " sek";
}

function endGame(){
showScreen("endScreen");

let avg = times.reduce((a,b)=>a+b,0)/times.length;

document.getElementById("resultTitle").textContent =
score===20 ? "💪 20 av 20" : "Resultat";

document.getElementById("finalScore").textContent =
score + " poäng";

document.getElementById("averageTime").textContent =
"Genomsnitt: " + formatTime(avg);

let best = localStorage.getItem("best20");

if(score===20){
if(!best || avg < best){
localStorage.setItem("best20", avg);
best = avg;
}
}

if(best){
document.getElementById("bestTime").textContent =
"Bästa (20/20): " + formatTime(best);
}else{
document.getElementById("bestTime").textContent = "";
}
}

document.addEventListener("DOMContentLoaded", init);
