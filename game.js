/* ===================== Randomized puzzle data ===================== */

const CAESAR_WORDS = [
  "HELLO VAULT", "ANCIENT SEAL", "HIDDEN DOOR", "SECRET CODE",
  "GOLDEN KEY", "LOST ARCHIVE", "STONE GATE", "SILENT TOMB"
];

const KATAPAYADI_MAP = [
  { syll: "ka", digit: 1 }, { syll: "kha", digit: 2 }, { syll: "ga", digit: 3 },
  { syll: "gha", digit: 4 }, { syll: "ṅa", digit: 5 }, { syll: "ca", digit: 6 },
  { syll: "cha", digit: 7 }, { syll: "ja", digit: 8 }, { syll: "jha", digit: 9 }
];

const BHUTA_SANKHYA_WORDS = [
  { word: "MOON", n: 1 }, { word: "EARTH", n: 1 }, { word: "EYES", n: 2 },
  { word: "HANDS", n: 2 }, { word: "VEDAS", n: 4 }, { word: "DIRECTIONS", n: 4 },
  { word: "SEASONS", n: 6 }, { word: "SENSES", n: 6 }
];

const ACROSTIC_WORDS = ["SEAL", "GOLD", "RUNE", "DOOR", "MYTH", "VAULT"];
const ACROSTIC_LINES = {
  A: ["Always inspect the edges", "Ancient walls hold secrets", "A shadow moves along the stone"],
  B: ["Beneath the dust lies a clue", "Behind the arch, a whisper waits", "Beware the crumbling step"],
  D: ["Deep in the vault, silence grows", "Dust settles over old carvings", "Doors here rarely open twice"],
  E: ["Enter without fear", "Every torch flickers the same", "Echoes travel further than light"],
  G: ["Gold does not always gleam", "Guard the threshold carefully", "Ghosts of builders remain"],
  H: ["Hidden marks line the floor", "Heavy air fills the chamber", "History repeats in stone"],
  L: ["Look where lines begin", "Light barely reaches this far", "Legends rarely tell it all"],
  M: ["Many have tried before you", "Marks fade but never vanish", "Moss covers the old seal"],
  N: ["Night never truly leaves here", "No torch burns forever", "Names are carved, then forgotten"],
  O: ["Old stones remember more than us", "Only the patient succeed", "Once sealed, rarely opened"],
  R: ["Reach for what is unseen", "Roots have broken through stone", "Runes circle the inner door"],
  S: ["Seek beyond the obvious", "Silence is its own answer", "Stone remembers every step"],
  T: ["Time wears down every wall", "Torches cast long shadows", "The vault keeps its own count"],
  U: ["Under the arch, the air is cold", "Unseen hands shaped this place", "Unlock what patience reveals"],
  V: ["Voices echo faintly here", "Vaults like this rarely empty", "Vines have claimed the entrance"],
};

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function caesarEncode(text, shift){
  return text.replace(/[A-Z]/g, ch => String.fromCharCode(((ch.charCodeAt(0)-65+shift)%26)+65));
}

function buildCaesarLevel(){
  const word = "HELLO VAULT"; // static word - does not change between playthroughs
  const shift = 3; // static shift - does not change between playthroughs
  const encoded = caesarEncode(word, shift);
  return {
    number: "01", icon: "I", title: "The Caesar Gate", concept: "Substitution cipher", seal: String(1 + Math.floor(Math.random()*9)),
    story: `A Roman shift guards the first seal. Move each encrypted letter ${shift} place${shift===1?"":"s"} backward through the alphabet.`,
    panel: `${encoded}<small>Shift = ${shift} • Example: first letter shifts back ${shift}</small>`,
    answer: word,
    hint: `Shift every letter back by ${shift}. The first word starts with "${word[0]}".`,
    lesson: "A Caesar cipher replaces each letter with another a fixed distance away. With only 25 useful shifts, it is vulnerable to brute-force attacks."
  };
}

function buildKatapayadiLevel(){
  const shown = shuffle(KATAPAYADI_MAP).slice(0, 3);
  const chosen = shuffle(shown).slice(0, 2);
  const answer = chosen.map(c => c.digit).join("");
  return {
    number: "02", icon: "II", title: "The Katapayadi Chamber", concept: "Indian numerical encoding", seal: String(1 + Math.floor(Math.random()*9)),
    story: "The second seal is hidden in a consonant sequence. Three syllables are mapped below, but only two of them form the seal. Match each needed syllable to its digit, then read them left to right.",
    panel: `<div class="mapping">${shown.map(c=>`<span>${c.syll} = ${c.digit}</span>`).join("")}</div><small>Decode: ${chosen.map(c=>c.syll).join(" • ")}</small>`,
    answer,
    hint: `Only "${chosen.map(c=>c.syll).join('" and "')}" are needed. Read their digits in order: ${chosen.map(c=>c.digit).join(" then ")}.`,
    lesson: "Katapayadi associates consonants with digits so numbers can be represented through pronounceable words or verses. It is an encoding and memory system, not secure encryption."
  };
}

function buildBhutaSankhyaLevel(){
  const chosen = shuffle(BHUTA_SANKHYA_WORDS).slice(0, 4);
  const answer = chosen.map(c => c.n).join("");
  return {
    number: "03", icon: "III", title: "The Bhuta Sankhya Library", concept: "Word–number representation", seal: String(1 + Math.floor(Math.random()*9)),
    story: "Ancient scholars represented quantities with familiar objects. Translate the four symbols to reveal the library seal.",
    panel: `${chosen.map(c=>c.word).join(" • ")}<small>Use the quantity naturally associated with each word</small>`,
    answer,
    hint: `There ${chosen.map(c=>`${c.n===1?"is":"are"} ${c.n} ${c.word.toLowerCase()}`).join(", ")}.`,
    lesson: "Bhuta Sankhya expresses digits using objects with well-known quantities. This makes numerical ideas poetic and memorable, but does not provide modern cryptographic secrecy."
  };
}

function buildWhisperingWallLevel(){
  const word = pick(ACROSTIC_WORDS);
  const lines = word.split("").map(letter => pick(ACROSTIC_LINES[letter] || [`${letter} marks the beginning of this line`]));
  return {
    number: "04", icon: "IV", title: "The Whispering Wall", concept: "Steganography", seal: String(1 + Math.floor(Math.random()*9)),
    story: "The final seal is not encrypted—it is concealed. Examine the beginning of every line to find the hidden word.",
    panel: `<small style='font-size:14px;line-height:2;text-align:left'>${lines.join("<br>")}</small>`,
    answer: word,
    hint: "Read the first letter of each line from top to bottom.",
    lesson: "Steganography hides the existence of information. An acrostic hides text in initial letters; digital methods can hide data inside images or audio."
  };
}

function generateLevels(){
  return [buildCaesarLevel(), buildKatapayadiLevel(), buildBhutaSankhyaLevel(), buildWhisperingWallLevel()];
}

let levels = generateLevels();

/* ===================== Game state and logic ===================== */

let currentLevel = 0, score = 0, lives = 3, hintsUsed = 0, hintUsedThisLevel = false;
let seconds = 0, timerId = null, soundOn = true, player = "Explorer";

const $ = id => document.getElementById(id);
const screens = ["startScreen", "gameScreen", "vaultScreen", "resultScreen", "reviewScreen", "teamScreen"];
function showScreen(id){ screens.forEach(s => $(s).classList.toggle("active", s === id)); window.scrollTo({top:0,behavior:"smooth"}); }
function updateHud(){ $("score").textContent = Math.max(0,score); $("lives").textContent = lives > 0 ? "♥ ".repeat(lives).trim() : "—"; $("lives").setAttribute("aria-label", `${lives} lives`); }
function formatTime(s){ return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }
function tone(type){ if(!soundOn) return; const C=window.AudioContext||window.webkitAudioContext; if(!C) return; const c=new C(),o=c.createOscillator(),g=c.createGain(); o.connect(g);g.connect(c.destination);o.frequency.value=type==="good"?660:180;g.gain.setValueAtTime(.08,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.18);o.start();o.stop(c.currentTime+.18); }

function startGame(){
  const name=$("playerName").value.trim();
  if(!name){ $("nameError").textContent="Enter your name before entering the vault."; $("playerName").focus(); return; }
  player=name; levels=generateLevels(); currentLevel=0;score=0;lives=3;hintsUsed=0;seconds=0;hintUsedThisLevel=false;
  $("hud").hidden=false; updateHud(); $("timer").textContent="00:00";
  clearInterval(timerId); timerId=setInterval(()=>{$("timer").textContent=formatTime(++seconds)},1000);
  showScreen("gameScreen"); loadLevel();
}

function loadLevel(){
  const l=levels[currentLevel]; hintUsedThisLevel=false;
  $("levelNumber").textContent=`Chamber ${l.number}`; $("levelProgress").textContent=`${currentLevel+1} of ${levels.length}`;
  $("progressBar").style.width=`${((currentLevel+1)/levels.length)*100}%`; $("sealIcon").textContent=l.icon;
  $("conceptLabel").textContent=l.concept; $("levelTitle").textContent=l.title; $("storyText").textContent=l.story;
  $("cipherPanel").innerHTML=l.panel; $("answerInput").value=""; $("answerInput").placeholder=currentLevel===2?"Enter four digits":"Enter decoded answer";
  $("feedback").textContent=""; $("feedback").className="message"; $("hintBox").hidden=true; $("lessonBox").hidden=true;
  $("hintBox").textContent=l.hint; $("lessonBox").textContent=l.lesson;
  $("hintButton").disabled=false; $("hintButton").style.opacity="1"; renderSeals(); $("answerInput").focus();
}

function normalize(v){ return v.trim().toUpperCase().replace(/[\s-]+/g," "); }
function checkAnswer(){
  const input=$("answerInput"), feedback=$("feedback"), l=levels[currentLevel];
  if(!input.value.trim()){feedback.textContent="Enter an answer first.";feedback.className="message error";return;}
  if(normalize(input.value)===normalize(l.answer)){
    score += hintUsedThisLevel ? 60 : 100; tone("good"); feedback.textContent=`Correct. Seal ${l.seal} recovered!`;feedback.className="message success";updateHud();renderSeals(currentLevel+1);
    $("submitAnswer").disabled=true; setTimeout(()=>{ $("submitAnswer").disabled=false; currentLevel++; currentLevel<levels.length?loadLevel():openFinalChamber(); },850);
  }else{
    lives--;score=Math.max(0,score-20);tone("bad");feedback.textContent=lives?`The seal resisted. ${lives} ${lives===1?"life":"lives"} remaining.`:"The vault expelled you. Restarting the expedition…";feedback.className="message error";updateHud();
    input.classList.remove("shake");void input.offsetWidth;input.classList.add("shake");
    if(lives===0){setTimeout(()=>{clearInterval(timerId);$("hud").hidden=true;showScreen("startScreen");$("nameError").textContent="The expedition ended. Enter your name to try again.";},1100);}
  }
}

function renderSeals(count=currentLevel){ $("collectedSeals").innerHTML=levels.map((l,i)=>`<i class="${i<count?"found":""}">${i<count?l.seal:"?"}</i>`).join(""); }
function revealHint(){ if(hintUsedThisLevel)return;hintUsedThisLevel=true;hintsUsed++;score=Math.max(0,score-40);updateHud();$("hintBox").hidden=false;$("hintButton").disabled=true;$("hintButton").style.opacity=".45"; }
function openFinalChamber(){ showScreen("vaultScreen"); $("finalSeals").innerHTML=levels.map(l=>`<i>${l.seal}</i>`).join(""); $("vaultInput").value=""; $("vaultFeedback").textContent=""; $("vaultInput").focus(); }
function checkVault(){
  const answer=$("vaultInput").value.replace(/\D/g,"");
  if(answer===levels.map(l=>l.seal).join("")){score+=200;tone("good");clearInterval(timerId);showResults();}
  else{score=Math.max(0,score-20);tone("bad");$("vaultFeedback").textContent="The sequence is incorrect. Use chamber order: I, II, III, IV.";$("vaultFeedback").className="message error";updateHud();}
}
function showResults(){ $("hud").hidden=true;$("finalScore").textContent=score;$("finalTime").textContent=formatTime(seconds);$("finalHints").textContent=hintsUsed;$("resultMessage").textContent=`${player}, you decoded every chamber and recovered the ancient archive.`;showScreen("resultScreen");saveScore(); }
async function saveScore(){try{await fetch("/api/scores",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({player,score,time:seconds,hints:hintsUsed})})}catch(_error){/* Offline mode remains fully playable. */}}
function resetToStart(){clearInterval(timerId);$("hud").hidden=true;$("nameError").textContent="";showScreen("startScreen");}

$("startButton").addEventListener("click",startGame); $("playerName").addEventListener("keydown",e=>{if(e.key==="Enter")startGame()});
$("submitAnswer").addEventListener("click",checkAnswer); $("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkAnswer()});
$("hintButton").addEventListener("click",revealHint); $("lessonButton").addEventListener("click",()=>{$("lessonBox").hidden=!$("lessonBox").hidden});
$("openVault").addEventListener("click",checkVault); $("vaultInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkVault()});
$("restartButton").addEventListener("click",resetToStart); $("reviewRestart").addEventListener("click",resetToStart); $("reviewButton").addEventListener("click",()=>showScreen("reviewScreen"));
$("teamButton").addEventListener("click",()=>showScreen("teamScreen")); $("teamBack").addEventListener("click",resetToStart);
$("soundToggle").addEventListener("click",()=>{soundOn=!soundOn;$("soundToggle").textContent=soundOn?"♪":"×";$("soundToggle").setAttribute("aria-label",soundOn?"Mute sound":"Enable sound")});
