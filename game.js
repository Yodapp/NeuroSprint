
let score=0, round=0, totalRounds=20;
let currentSymbol="", inputLocked=false;

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}
function startGame(){score=0;round=0;document.getElementById("score").textContent=0;document.getElementById("progressBar").style.width="0%";showScreen("gameScreen");nextRound();}
function nextRound(){if(round>=totalRounds){endGame();return;}round++;document.getElementById("roundText").textContent="Runda "+round+" av "+totalRounds;document.getElementById("progressBar").style.width=(round/totalRounds*100)+"%";currentSymbol=Math.random()>0.5?"●":"■";const el=document.getElementById("symbol");el.textContent=currentSymbol;el.classList.remove("hide","pop");inputLocked=false;}
function choose(side){if(inputLocked)return;inputLocked=true;const correct=(currentSymbol==="●"&&side==="left")||(currentSymbol==="■"&&side==="right");const el=document.getElementById("symbol");if(correct){score++;document.getElementById("score").textContent=score;el.classList.add("pop");}setTimeout(()=>{el.classList.add("hide");setTimeout(nextRound,120);},120);}
function endGame(){showScreen("endScreen");document.getElementById("resultTitle").textContent=score===20?"💪 20 av 20":"Resultat";document.getElementById("finalScore").textContent=score+" poäng";document.getElementById("encouragement").textContent=score===20?"Du är snabb idag.":"Fortsätt träna.";}
