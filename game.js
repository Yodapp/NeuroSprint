let score=0;
let round=0;
let totalRounds=20;
let startTime;
let reactionTimes=[];

function showScreen(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function startGame(){
score=0;
round=0;
reactionTimes=[];
document.getElementById("score").textContent=score;
document.getElementById("progressBar").style.width="0%";
showScreen("gameScreen");
nextRound();
}

function nextRound(){
if(round>=totalRounds){ endGame(); return; }
round++;
document.getElementById("roundText").textContent="Runda "+round+" av "+totalRounds;
document.getElementById("progressBar").style.width=(round/totalRounds*100)+"%";
const symbol=Math.random()>0.5?"●":"■";
document.getElementById("symbol").textContent=symbol;
startTime=Date.now();
}

function choose(side){
const symbol=document.getElementById("symbol").textContent;
const correct=(symbol==="●"&&side==="left")||(symbol==="■"&&side==="right");
const reaction=Date.now()-startTime;
reactionTimes.push(reaction);
if(correct) score++;
document.getElementById("score").textContent=score;
nextRound();
}

function formatTime(ms){
ms=Number(ms);
if(ms<1000) return ms+" ms";
return (ms/1000).toFixed(1).replace('.',',')+" sek";
}

function endGame(){
showScreen("endScreen");
const avg=reactionTimes.reduce((a,b)=>a+b,0)/reactionTimes.length;
const best=localStorage.getItem("bestTime");

if(!best||avg<best){
localStorage.setItem("bestTime",avg);
document.getElementById("encouragement").textContent="🔥 Nytt personligt rekord! Fantastiskt jobbat.";
}else{
document.getElementById("encouragement").textContent="👏 Bra tränat idag. Lite varje dag gör skillnad.";
}

document.getElementById("finalScore").textContent="Du fick: "+score+" poäng";
document.getElementById("reactionTime").textContent="Genomsnitt: "+formatTime(avg);
document.getElementById("bestTime").textContent="Bästa: "+formatTime(localStorage.getItem("bestTime"));
}
