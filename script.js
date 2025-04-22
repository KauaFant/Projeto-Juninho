const startBtn = document.getElementById("start-btn");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const bgMusic = document.getElementById("bg-music");
const creepySound = document.getElementById("creepy-sound");

const backBtn = document.getElementById("back-btn");
const choicesDiv = document.getElementById("choices");
const choice1Btn = document.getElementById("choice-1");
const choice2Btn = document.getElementById("choice-2");

let storyIndex = 0;
let currentPath = null;
let roomIndex = 0;
const storyLines = [
  "Você está na sua Mansão. Está no seu quarto. Sozinho, seus pais estão viajando.",
  "O dia tá chuvoso, frio, e a noite está muito mais escura que o normal.",
  "Você tem medo do escuro. Medo de ficar sozinho...",
  "Barulhos estranhos aparecem, aparentemente vêm da sala.",
  "Você liga sua lanterna, olha para a porta com medo.",
  "Você ainda está com dúvida, quer ir?"
];

const storyRoom = [
  "Você decide ir para a sala. Você abre a porta, anda no corredor, com medo e apenas uma lanterna para se proteger.",
  "Você chega na escada, está muito escuro.",
  "Cada passo que você dá, o chão range como se avisasse que você está chegando.",
  "De repente, a lanterna pisca — algo se moveu ao fundo.",
  "Você respira fundo e continua, com o coração acelerado."
];

const storybedroom = [
  "Você decide não ir. Mas o barulho começa a passar pelo corredor do andar de baixo",
  "Você se tranca no quarto, tentando ignorar os sons lá fora.",
  "Mas eles não param. Pelo contrário, parecem mais próximos.",
  "A maçaneta da porta se move sozinha.",
  "Você grita, mas ninguém responde."
];

// Eventos
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextStory);
choice1Btn.addEventListener("click", chooseOption1);
choice2Btn.addEventListener("click", chooseOption2);

function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  bgMusic.play();

  storyIndex = 0;
  showStory();
  nextBtn.classList.remove("hidden");
  backBtn.classList.remove("hidden");
}

function showStory() {

  if (storyIndex < storyLines.length) {
    storyText.textContent = storyLines[storyIndex];
    if (storyIndex === 5) {
      showChoices();
    } else {
      choicesDiv.classList.add("hidden");
      nextBtn.classList.remove("hidden");
    }
    if (storyIndex < storyLines.length) {
      storyText.textContent = storyLines[storyIndex];
      if (storyLines[storyIndex] === "Barulhos estranhos aparecem, aparentemente vêm da sala.") {
        bgMusic.pause(); 
        creepySound.currentTime = 0;
        creepySound.play(); 
      } else {
        creepySound.pause();
        creepySound.currentTime = 0;
    
        if (bgMusic.paused) {
          bgMusic.play();
        }
      }
    }
  }
}

function showChoices() {
  choicesDiv.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  choice1Btn.textContent = "Sim";
  choice2Btn.textContent = "Não";
}

function chooseOption1() {
  currentPath = storyRoom;
  pathIndex = 0;
  storyText.textContent = currentPath[pathIndex];
  choicesDiv.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

function chooseOption2() {
  currentPath = storybedroom;
  pathIndex = 0;
  storyText.textContent = currentPath[pathIndex];
  choicesDiv.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

function nextStory() {
  if (currentPath) {
    pathIndex++;
    if (pathIndex < currentPath.length) {
      storyText.textContent = currentPath[pathIndex];
    } else {
      currentPath = null;
      alert("Fim do jogo! Obrigado por jogar.");
      nextBtn.classList.add("hidden");
      bgMusic.pause();
    }
  } else {
    storyIndex++;
    if (storyIndex < storyLines.length) {
      showStory();
    } else {
      nextBtn.classList.add("hidden");
      alert("Fim do jogo! Obrigado por jogar.");
      bgMusic.pause();
    }
  }
}

backBtn.addEventListener("click", restartGame);

function restartGame() {
  gameScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  storyIndex = 0;
  pathIndex = 0;
  currentPath = null;

  storyText.textContent = "";
  choicesDiv.classList.add("hidden");
  nextBtn.classList.add("hidden");
  backBtn.classList.add("hidden");

  bgMusic.pause();
  bgMusic.currentTime = 0;

  creepySound.pause();
  creepySound.currentTime = 0;
}