
let score=0, round=0, totalRounds=20;
let currentSymbol="", locked=false;

function showScreen(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

document.getElementById("startBtn").onclick=startGame;
document.getElementById("restartBtn").onclick=startGame;

function startGame(){
score=0;round=0;
document.getElementById("score").textContent=0;
document.getElementById("progressBar").style.width="0%";
showScreen("gameScreen");
nextRound();
}

function nextRound(){
if(round>=totalRounds){endGame();return;}
round++;
document.getElementById("roundText").textContent="Runda "+round+" av "+totalRounds;
document.getElementById("progressBar").style.width=(round/totalRounds*100)+"%";
currentSymbol=Math.random()>0.5?"●":"■";
document.getElementById("symbol").textContent=currentSymbol;
locked=false;
}

document.getElementById("leftHalf").onclick=()=>choose('left');
document.getElementById("rightHalf").onclick=()=>choose('right');

function choose(side){
if(locked)return;
locked=true;

let correct=(currentSymbol==="●"&&side==="left")||(currentSymbol==="■"&&side==="right");
let el=document.getElementById("symbol");

if(correct){
score++;
document.getElementById("score").textContent=score;
el.style.transform="scale(1.1)";
}

setTimeout(()=>{
el.style.transform="scale(1)";
nextRound();
},150);
}

function endGame(){
showScreen("endScreen");
document.getElementById("resultTitle").textContent=score===20?"💪 20 av 20":"Resultat";
document.getElementById("finalScore").textContent=score+" poäng";
}
