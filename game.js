let score=0;
let round=0;
let totalRounds=20;
let startTime;
let reactionTimes=[];
let currentSymbol="";
let inputLocked=false;

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

currentSymbol=Math.random()>0.5?"●":"■";
const symbolEl=document.getElementById("symbol");
symbolEl.textContent=currentSymbol;
symbolEl.classList.remove("hide","pop");

startTime=Date.now();
inputLocked=false;
}

function choose(side){
if(inputLocked) return;
inputLocked=true;

const correct=(currentSymbol==="●"&&side==="left")||(currentSymbol==="■"&&side==="right");
const reaction=Date.now()-startTime;
reactionTimes.push(reaction);

const left=document.getElementById("leftHalf");
const right=document.getElementById("rightHalf");
const symbolEl=document.getElementById("symbol");

if(correct){
score++;
document.getElementById("score").textContent=score;
document.getElementById("score").classList.add("pop");
symbolEl.classList.add("pop");
navigator.vibrate && navigator.vibrate(10);
(side==="left"?left:right).classList.add("correct");
}else{
(side==="left"?left:right).classList.add("wrong");
navigator.vibrate && navigator.vibrate(30);
}

setTimeout(()=>{
document.getElementById("score").classList.remove("pop");
symbolEl.classList.remove("pop");
left.classList.remove("correct","wrong");
right.classList.remove("correct","wrong");

symbolEl.classList.add("hide");

setTimeout(()=>{
nextRound();
},120);

},120);
}

function formatTime(ms){
ms=Number(ms);
if(ms<1000) return Math.round(ms)+" ms";
return (ms/1000).toFixed(1).replace('.',',')+" sek";
}

function endGame(){
showScreen("endScreen");
const avg=reactionTimes.reduce((a,b)=>a+b,0)/reactionTimes.length;

let encouragement="";
if(score===20){
const best=localStorage.getItem("bestTime");
if(!best||avg<best){
localStorage.setItem("bestTime",avg);
encouragement="🔥 Nytt personligt rekord! Perfekt runda!";
}else{
encouragement="💪 20 av 20! Grymt jobbat!";
}
}else{
encouragement="Bra jobbat! Försök nå 20/20 nästa gång.";
}

document.getElementById("encouragement").textContent=encouragement;
document.getElementById("finalScore").textContent="Du fick: "+score+" poäng";
document.getElementById("reactionTime").textContent="Genomsnitt: "+formatTime(avg);

const bestTime=localStorage.getItem("bestTime");
document.getElementById("bestTime").textContent=bestTime?
"Bästa (20/20): "+formatTime(bestTime):
"Sikta på 20/20 för att låsa upp bästa-tid";
}
