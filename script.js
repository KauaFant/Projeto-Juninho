const startBtn = document.getElementById("start-btn");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const bgMusic = document.getElementById("bg-music");
const creepySound = document.getElementById("creepy-sound");
const scaryMusic = document.getElementById("scary-music");
const newMusic = document.getElementById("new-music");
const heart = document.getElementById("heart");
const backBtn = document.getElementById("back-btn");
const choicesDiv = document.getElementById("choices");
const choice1Btn = document.getElementById("choice-1");
const choice2Btn = document.getElementById("choice-2");
const fnafMiniGameSound = document.getElementById("fnaf-mini-game-sound");
const deathScreen = document.getElementById("death-screen");
const retryBtn = document.getElementById("retry-btn");
const fnafLightReveal = document.getElementById("fnafLightReveal");


//ambientFnafSound.currentTime = 0;
//ambientFnafSound.loop = true;
//ambientFnafSound.play();

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
  "Cada passo que você dá, o chão range como se avisasse que alguém está chegando.",
  "De repente, a lanterna pisca — algo se moveu ao fundo.",
  "Você respira fundo e continua, com o coração acelerado.",
  "Você finalmente chega no andar de baixo. Está escuro, seu coração bate mais forte",
  "Os sons param, você só escuta seu coração.",
  "Você chega na porta da sala, abre a porta e...",
  "Não da para acretidar no que você ouviu... A mansão é assombrada?.."
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
  // Inicia o fade-out da tela de início
  startScreen.classList.add("fade-out");
  startScreen.style.transition = "opacity 2s ease"; // Transição suave
  startScreen.style.opacity = "0"; // Tornando a tela invisível com o fade

  // Espera 2 segundos antes de trocar de tela
  setTimeout(() => {
    startScreen.classList.add("hidden"); // Esconde a tela de início completamente
    gameScreen.classList.remove("hidden"); // Exibe a tela do jogo

    // Inicia a música de fundo após o fade-out
    bgMusic.play(); 

    // Restaura o índice da história e exibe o conteúdo inicial
    storyIndex = 0;
    showStory(); // Exibe o conteúdo da história
    nextBtn.classList.remove("hidden"); // Mostra o botão de avançar
    backBtn.classList.remove("hidden"); // Mostra o botão de voltar

    // Remover a classe para permitir reiniciar depois
    startScreen.classList.remove("fade-out");

  }, 2000); // Tempo de espera para o fade-out
}

function nextStory() {
  if (currentPath) {
    pathIndex++;
    if (pathIndex < currentPath.length) {
      storyText.textContent = currentPath[pathIndex];

      // Verifica a frase para aplicar ou remover o fundo
      if (storyText.textContent === "Você liga sua lanterna, olha para a porta com medo.") {
        document.body.classList.add('background-image');
      } else {
        document.body.classList.remove('background-image');
      }

      // Sons da trilha alternativa
      if (storyText.textContent === "De repente, a lanterna pisca — algo se moveu ao fundo.") {
        heart.currentTime = 0;
        heart.play();
      }

      if (storyText.textContent === "Mas eles não param. Pelo contrário, parecem mais próximos.") {
        newMusic.currentTime = 0;
        newMusic.play();
      }

    } else {
      currentPath = null;
      alert("Fim do jogo! Obrigado por jogar.");
      nextBtn.classList.add("hidden");
      bgMusic.pause();
      document.body.classList.remove('background-image'); // Limpa fundo ao final
    }
  } else {
    storyIndex++;
    if (storyIndex < storyLines.length) {
      showStory();

      // Sons da trilha principal
      if (storyLines[storyIndex] === "Barulhos estranhos aparecem, aparentemente vêm da sala.") {
        creepySound.currentTime = 0;
        creepySound.play();
      }

    } else {
      nextBtn.classList.add("hidden");
      alert("Fim do jogo! Obrigado por jogar.");
      bgMusic.pause();
      document.body.classList.remove('background-image'); // Limpa fundo ao final
    }
  }
  if (storyText.textContent === "Você finalmente chega no andar de baixo. Está escuro, seu coração bate mais forte") {
    heart.volume = 0.0;
    heart.playbackRate = 2.0; // Aumenta a velocidade do som
    heart.currentTime = 0;
    heart.play();
  
    let volumeStep = 0.1;
    let volumeInterval = setInterval(() => {
      if (heart.volume < 1.0) {
        heart.volume = Math.min(heart.volume + volumeStep, 1.0);
      } else {
        clearInterval(volumeInterval);
      }
    }, 200);
  }
  if (storyText.textContent === "Os sons param, você só escuta seu coração.") {
    bgMusic.pause();
    bgMusic.currentTime = 0; // Reseta a música
  }
  if (storyText.textContent === "Você chega na porta da sala, abre a porta e...") {
  startFnafScene();
  return;
}
}

function showStory() {
  storyText.textContent = storyLines[storyIndex];
  if (storyText.textContent === "Você finalmente chega no andar de baixo. Está escuro, seu coração bate mais forte") {
    heart.volume = 0.1;
    heart.playbackRate = 2.0; // Aumenta a velocidade aqui também
    heart.currentTime = 0;
    heart.play();
  
    let volumeStep = 0.05;
    let volumeInterval = setInterval(() => {
      if (heart.volume < 1) {
        heart.volume = Math.min(heart.volume + volumeStep, 1);
      } else {
        clearInterval(volumeInterval);
      }
    }, 300);
  }

  // Verifica a frase para aplicar ou remover o fundo
  if (storyLines[storyIndex] === "Você liga sua lanterna, olha para a porta com medo.") {
    document.body.classList.add('background-image');
  } else {
    document.body.classList.remove('background-image');
  }

  // Se for o último texto da história principal, mostra escolhas
  if (storyIndex === storyLines.length - 1) {
    showChoices();
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
  // Pausar qualquer som que já esteja tocando
  if (!scaryMusic.paused) {
    scaryMusic.pause();
    scaryMusic.currentTime = 0; // Reinicia o som
  }

  // Pausar a música de fundo
  bgMusic.pause();
  bgMusic.currentTime = 0; // Reinicia a música de fundo

  // Tocar a música de susto
  scaryMusic.currentTime = 0;
  scaryMusic.play();

  // Mudar para a história do quarto
  currentPath = storybedroom;
  pathIndex = 0;
  storyText.textContent = currentPath[pathIndex];
  choicesDiv.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}


backBtn.addEventListener("click", restartGame);
function restartGame() {
  // Esconde a tela do jogo
  gameScreen.classList.add("hidden");

  // Resetando os dados do jogo
  storyIndex = 0;
  pathIndex = 0;
  currentPath = null;
  storyText.textContent = "";
  fnafLightReveal.style.display = "none"; // Esconde a imagem com máscara
  lanternOn = false;
  choicesDiv.classList.add("hidden");
  nextBtn.classList.add("hidden");
  backBtn.classList.add("hidden");

  // Pausar todas as músicas e sons
  bgMusic.pause();
  bgMusic.currentTime = 0;
  creepySound.pause();
  creepySound.currentTime = 0;
  scaryMusic.pause();
  scaryMusic.currentTime = 0;
  heart.pause();
  heart.currentTime = 0;
  newMusic.pause();
  newMusic.currentTime = 0;
  fnafMiniGameSound.pause();
  fnafMiniGameSound.currentTime = 0;
  // Exibe a tela de início novamente
  startScreen.classList.remove("fade-out");
  startScreen.style.opacity = "1"; // Garantir que a opacidade esteja 100%

  // Exibe a tela de início
  startScreen.classList.remove("hidden");

  // Exibe o botão de "Voltar ao Início"
  backBtn.classList.remove("hidden");

  // Restaura o estado da lanterna
  flashlightOn = false;
  fnafCanvas.removeEventListener("mousemove", moveLantern);
  fnafCanvas.style.background = "black";  // Fica preto quando a lanterna estiver desligada
  
}

const fnafScene = document.getElementById("fnaf4-scene");
  const fnafCanvas = document.getElementById("fnaf4-canvas");
  const flashlightBtn = document.getElementById("flashlight-btn");
  const dangerBtn = document.getElementById("danger-btn");

  let flashlightOn = false;
  let dangerTimeout;

  function startFnafScene() {
    // Fade da música atual
    bgMusic.pause();
    creepySound.pause();
  
    // Toca o som do mini game FNaF
    fnafMiniGameSound.currentTime = 0; // Reseta o áudio
    fnafMiniGameSound.play(); // Começa o som
  
    // Fade to black por 2 segundos
    document.body.style.transition = "opacity 2s ease";
    document.body.style.opacity = "0";
    
    setTimeout(() => {
      gameScreen.classList.add("hidden");
      fnafScene.classList.remove("hidden");
      document.body.style.opacity = "1";
    }, 2000);
    
    // Resetar controles
    flashlightOn = false;
    dangerBtn.classList.add("hidden");
    
    // Começa o cronômetro para continuar história se jogador não apertar o botão
    dangerTimeout = setTimeout(() => {
      endFnafScene(); // Aqui você vai terminar a cena FNaF caso o jogador não clique a tempo
    }, 30000); // 30 segundos
  }

  fnafCanvas.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 100; // área sensível ao redor do centro
  
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < radius) {
      dangerBtn.style.display = "block"; // mostra o botão
    } else {
      dangerBtn.style.display = "none"; // esconde se sair do centro
    }
  });

  flashlightBtn.addEventListener("click", () => {
    flashlightOn = !flashlightOn;
    
    // Esconder imagem ao voltar ao início
    backBtn.addEventListener("click", () => {
      lightReveal.style.display = "none";
      // outras coisas que já ocorrem aqui, como resetar a história
    });

    // Esconder imagem ao morrer e clicar em "tentar novamente"
    retryBtn.addEventListener("click", () => {
      lightReveal.style.display = "none";
    });

    if (flashlightOn) {
      fnafCanvas.addEventListener("mousemove", moveLantern);
      fnafCanvas.style.background = "none";
      fnafLightReveal.style.display = "block"; // Mostra imagem de fundo iluminada
      lanternOn = true;
    } else {
      fnafCanvas.removeEventListener("mousemove", moveLantern);
      fnafCanvas.style.background = "black";
      fnafLightReveal.style.display = "none"; // Esconde a imagem iluminada
      lanternOn = false;
    }
  
    if (flashlightOn) {
      dangerBtn.classList.remove("hidden");
    } else {
      dangerBtn.classList.add("hidden");
    }
  });
  
  dangerBtn.addEventListener("click", () => {
    clearTimeout(dangerTimeout);  // Para o tempo de perigo
    fnafScene.classList.add("hidden");
  
    // PAUSA o som do mini game
    fnafMiniGameSound.pause();
    fnafMiniGameSound.currentTime = 0;
  
    // Mostra o vídeo de susto
    const videoContainer = document.getElementById("video-container");
    const scaryVideo = document.getElementById("scary-video");
  
    videoContainer.classList.remove("hidden");
    scaryVideo.currentTime = 0;
    scaryVideo.play();
  
    // Quando o vídeo terminar, mostrar a tela de morte
    scaryVideo.onended = () => {
      videoContainer.classList.add("hidden");
      deathScreen.classList.remove("hidden");
    };
  });


function endFnafScene() {
  fnafScene.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  storyText.textContent = "Você entra na sala, mas parece vazia... Por enquanto.";
  nextBtn.classList.remove("hidden");
  currentPath = null;

  fnafMiniGameSound.pause();
  fnafMiniGameSound.currentTime = 0;

  fnafLightReveal.style.display = "none"; // <-- Adicionado aqui
  lanternOn = false;
}


function moveLantern(e) {
  const x = e.clientX;
  const y = e.clientY;
  fnafCanvas.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0.85) 200px, rgba(0,0,0,1) 400px)`;
}

retryBtn.addEventListener("click", () => {
  deathScreen.classList.add("hidden");
  restartGame();
});

let lanternOn = false;

document.addEventListener("mousemove", (e) => {
  if (lanternOn) {
    const x = e.clientX;
    const y = e.clientY;
    fnafLightReveal.style.setProperty("--x", `${x}px`);
    fnafLightReveal.style.setProperty("--y", `${y}px`);
  }
});
