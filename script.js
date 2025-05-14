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
const mysterious = document.getElementById("mysterious");
const fear = document.getElementById("theme");
const intro = document.getElementById("intro-music");


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
  "Você chega na porta da sala, abre a porta e..."
];

const storybedroom = [
  "Você decide não ir. Mas o barulho começa a passar pelo corredor do andar de baixo",
  "Você se tranca no quarto, tentando ignorar os sons lá fora.",
  "Mas eles não param. Pelo contrário, parecem mais próximos.",
  "A maçaneta da porta se move sozinha.",
  "Com muito medo, você tenta ficar em silêncio total.",
  "Você sobe em cima da cama, segura sua lanterna e começa a tremer...",
  "Você não tem certeza se trancou a porta..",
  "Então você decide ir trancar.. com medo..",
  "Os sons param, você só escuta seu coração.",
  "Você sente mais medo.."
];

const postFnafLines = [
  "Não da para acretidar no que você viu e ouviu... A mansão é assombrada?..",
  "Sem pensar duas vezes você sai da sala, tranca a porta",
  "Você começa a escutar outro som.",
  "Parece que vem do seu quarto..",
  "Você sente um calafrio no corpo, e sente mais medo.",
  "Até que...",
  "DESCONHECIDO: Oii, você mora aqui?",
  "DESCONHECIDO: Não precisa ter medo, eu não vou te machucar!",
  "DESCONHECIDO: Eu to aqui! Presa na parede!",
  "Você fica confuso, não sabe se vai ajuda-lá.",
  "Você quer ir?"
];

const quarto = [ 
  "Exelente!, você trancou a porta",
  "Mesmo com a porta trancada, você ainda sente medo.."
];


// Eventos
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextStory);
choice1Btn.addEventListener("click", chooseOption1);
choice2Btn.addEventListener("click", chooseOption2);

function startGame() {
  intro.currentTime = 0;
  intro.play();
  // Inicia o fade-out da tela de início
  startScreen.classList.add("fade-out");
  startScreen.style.transition = "opacity 2s ease"; // Transição suave
  startScreen.style.opacity = "0"; // Tornando a tela invisível com o fade

  // Espera 2 segundos antes de trocar de tela
  setTimeout(() => {
    intro.pause();
    intro.currentTime = 0;
    startScreen.classList.add("hidden"); // Esconde a tela de início completamente
    const medrosoBtn = document.getElementById("Medroso");
    medrosoBtn.classList.add("hidden");     // Esconde o botão
    medrosoBtn.classList.remove("active");  // Remove efeito ativo
    medrosoBtn.style.pointerEvents = "none"; // Impede clique

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

      if (currentPath[pathIndex] === "Parece que o jogo acabou...") {
        const luzBtn = document.getElementById("Medroso");
        luzBtn.classList.remove("hidden");
        luzBtn.classList.add("visible");
        heart.currentTime = 0;
        heart.play();
        startFnafChaos();
        
        return; // Para impedir que o botão avance mais a história
      }
      if (currentPath[pathIndex] === "Você quer ir?") {
        // Oculta o botão de próximo passo e mostra os novos botões
        nextBtn.classList.add("hidden");
        choicesDiv.classList.add("hidden"); // Se necessário, oculta o container antigo
      
        const newGameButtons = document.getElementById("new-game-buttons");
        newGameButtons.style.display = "block"; // Torna os novos botões visíveis
      
        // Define ações para os botões
        const yesButton = document.getElementById("yes");
        const noButton = document.getElementById("no");
      
        // Ação para o botão "Sim"
        yesButton.onclick = () => {
          currentPath = [ // Novo caminho para o "Sim"
            "Você decide ajudar a voz desconhecida.",
            "Você toca na parede, ela começa a tremer...",
            "Uma luz intensa surge, e você ouve uma risada distante.",
            "Algo mudou... para sempre."
          ];
          pathIndex = 0;
          storyText.textContent = currentPath[pathIndex];
      
          // Oculta os botões e mostra o botão de próximo passo
          newGameButtons.style.display = "none";
          nextBtn.classList.remove("hidden");
        };
      
        // Ação para o botão "Não"
        noButton.onclick = () => {
          currentPath = [ // Novo caminho para o "Não"
            "Você decide não confiar na voz misteriosa.",
            "Você corre para longe da voz.",
            "Você entra na cozinha... Mas..",
            "Quando você abre a porta, você vê muitos monstros... te observando...",
            "Parece que o jogo acabou..."
          ];
          pathIndex = 0;
          storyText.textContent = currentPath[pathIndex];
      
          // Oculta os botões e mostra o botão de próximo passo
          newGameButtons.style.display = "none";
          nextBtn.classList.remove("hidden");
        };
      }

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

      if (currentPath && currentPath[pathIndex] === "Quando você abre a porta, você vê muitos monstros... te observando...") {
        mysterious.pause();
        mysterious.currentTime = 0;
        fear.currentTime = 0;
        fear.play();
      }

      if (storyText.textContent === "Mas eles não param. Pelo contrário, parecem mais próximos.") {
        newMusic.currentTime = 0;
        newMusic.play();
      }

    } else {
      currentPath = null;
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
    newMusic.pause();
    newMusic.currentTime = 0
    scaryMusic.pause();
    scaryMusic.currentTime - 0;
  }

  if (storyText.textContent === "A maçaneta da porta se move sozinha.") {
    heart.currentTime = 0;
    heart.play();
  }

  if (storyText.textContent === "Você sente mais medo..") {
    newMusic.currentTime = 0;
    newMusic.play();
    gameScreen.classList.add("hidden"); // Esconde o jogo normal
    document.getElementById("minigame-room").classList.remove("hidden"); // Mostra o minigame
    iniciarMiniGame();
    return; // Para a progressão da história até o minigame terminar
  }

  if (storyText.textContent === "Você chega na porta da sala, abre a porta e...") {
  startFnafScene();
  return;
 }
  if (storyText.textContent === "Você começa a escutar outro som.") {
    newMusic.currentTime = 0;
    newMusic.play();
  }
  if (currentPath && currentPath[pathIndex] === "DESCONHECIDO: Oii, você mora aqui?") {
    mysterious.currentTime = 0;
    mysterious.play();
    heart.pause();
    heart.currentTime = 0;
    newMusic.pause();
    newMusic.currentTime = 0;
  
    typeWriter("DESCONHECIDO: Oii, você mora aqui?", storyText, 50);
    return;
  }
  if (currentPath && currentPath[pathIndex] === "DESCONHECIDO: Não precisa ter medo, eu não vou te machucar!") {
    typeWriter("DESCONHECIDO: Não precisa ter medo, eu não vou te machucar!", storyText, 50);
    return;
  }
  
  if (currentPath && currentPath[pathIndex] === "DESCONHECIDO: Eu to aqui! Presa na parede!") {
    typeWriter("DESCONHECIDO: Eu to aqui! Presa na parede!", storyText, 50, () => {
      storyText.classList.remove("typing-rosa");
    });
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
  location.reload();
}

function iniciarMiniGame() {
  const player = document.getElementById("player");
  const chave = document.getElementById("chave");
  const porta = document.getElementById("porta");
  let posX = 50;
  let posY = 20;
  let chaveColetada = false;

  const limiteX = { min: 0, max: window.innerWidth - 50 };
  const limiteY = { min: 0, max: window.innerHeight - 50 };

  function verificarColisao(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(aRect.right < bRect.left || aRect.left > bRect.right || aRect.bottom < bRect.top || aRect.top > bRect.bottom);
  }

  const handleKeydown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        posX = Math.max(limiteX.min, posX - 10);
        break;
      case "ArrowRight":
        posX = Math.min(limiteX.max, posX + 10);
        break;
      case "ArrowUp":
        posY = Math.min(limiteY.max, posY + 10);
        break;
      case "ArrowDown":
        posY = Math.max(limiteY.min, posY - 10);
        break;
    }

    player.style.left = posX + "px";
    player.style.bottom = posY + "px";

    const bonnieTocado = Array.from(document.querySelectorAll(".bonnie")).some(bonnie =>
      verificarColisao(player, bonnie)
    );

    if (bonnieTocado) {
      document.getElementById("minigame-room").classList.add("hidden");
      const videoContainer = document.getElementById("videodobonnie");
      const videobonnie = document.getElementById("videobonnie");
      const deathScreen = document.getElementById("death-screen");
      const deathText = document.getElementById("death-text");

      videoContainer.classList.remove("hidden");
      videobonnie.play();

      videobonnie.onended = () => {
        videoContainer.classList.add("hidden");
        deathScreen.classList.remove("hidden");
        deathText.classList.remove("hidden");
      };
      document.removeEventListener("keydown", handleKeydown);
      return;
    }

    if (!chaveColetada && verificarColisao(player, chave)) {
      chaveColetada = true;
      chave.style.display = "none";
    }

    if (verificarColisao(player, porta)) {
      if (chaveColetada) {
        alert("Você destrancou a porta e saiu da sala!");
        document.getElementById("minigame-room").classList.add("hidden");
        gameScreen.classList.remove("hidden");
        currentPath = quarto;
        pathIndex = 0;
        storyText.textContent = currentPath[pathIndex];
        nextBtn.classList.remove("hidden");
        document.removeEventListener("keydown", handleKeydown);
      } else {
        alert("A porta está trancada. Encontre a chave!");
      }
    }
  };

  document.addEventListener("keydown", handleKeydown);
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
    }, 18000); // 18 segundos
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
      flashlightBtn.classList.add("active");
    
      // Esconde o cursor
      fnafCanvas.style.cursor = "none";
    } else {
      fnafCanvas.removeEventListener("mousemove", moveLantern);
      fnafCanvas.style.background = "black";
      fnafLightReveal.style.display = "none"; // Esconde a imagem iluminada
      lanternOn = false;
      flashlightBtn.classList.remove("active");
    
      // Mostra o cursor novamente
      fnafCanvas.style.cursor = "default";
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
    
      const deathText = document.getElementById("death-text");
      deathText.classList.remove("hidden"); // <-- mostra o texto
    };
  });


  function endFnafScene() {
    fnafScene.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  
    currentPath = postFnafLines;
    pathIndex = 0;
    storyText.textContent = currentPath[pathIndex];
    nextBtn.classList.remove("hidden");
  
    fnafMiniGameSound.pause();
    fnafMiniGameSound.currentTime = 0;
  
    fnafLightReveal.style.display = "none";
    lanternOn = false;
  }


  function moveLantern(e) {
    const x = e.clientX;
    const y = e.clientY;
    fnafCanvas.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0.85) 200px, rgba(0,0,0,1) 400px)`;
  
    if (lanternOn) {
      const buttons = document.querySelectorAll(".chaos-button");
  
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
  
        const distance = Math.sqrt((x - btnX) ** 2 + (y - btnY) ** 2);
        if (distance < 100) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      });
    }
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

function typeWriter(text, element, speed = 100, callback = null) {
  let i = 0;
  element.textContent = "";
  element.classList.add("typing-rosa"); // Adiciona a cor rosa

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) {
        callback();
      }
    }
  }

  type();
}

let cowardLightOn = false;
let buttonsCreated = false;
let countdownTimer;
let isButtonClicked = false;
let countdownStarted = false;
const medrosoBtn = document.getElementById("Medroso");

if (medrosoBtn) {
  medrosoBtn.addEventListener("click", toggleCowardLight);
} else {
  console.error("Botão Medroso não encontrado no DOM!");
}

function startFnafChaos() {
  const medrosoBtn = document.getElementById("Medroso");

  if (medrosoBtn) {
    nextBtn.classList.add("hidden");
    storyText.textContent = "Rápido! Aperte algum botão!";
    
    medrosoBtn.classList.remove("hidden");
    medrosoBtn.style.pointerEvents = "auto";

    if (!document.getElementById("chaos-container")) {
      const chaosContainer = document.createElement("div");
      chaosContainer.id = "chaos-container";
      chaosContainer.style.position = "absolute";
      chaosContainer.style.top = "0";
      chaosContainer.style.left = "0";
      chaosContainer.style.width = "100%";
      chaosContainer.style.height = "100%";
      chaosContainer.style.zIndex = "9999";
      chaosContainer.classList.add("chaos-visible");
      gameScreen.appendChild(chaosContainer);
    }
  } else {
    console.error("Botão Medroso não encontrado na função startFnafChaos!");
  }
}

function toggleCowardLight() {
  console.log("Botão Luz foi clicado!"); // Adiciona um log para depuração
  cowardLightOn = !cowardLightOn;
  
  const medrosoBtn = document.getElementById("Medroso");
  const cozinha = document.getElementById("cozinha");

  if (medrosoBtn) {
    medrosoBtn.classList.toggle("active", cowardLightOn);
  }

  cozinha.style.display = cowardLightOn ? "block" : "none";
  
  if (cowardLightOn && !buttonsCreated) {
    createChaosButtons();
    buttonsCreated = true;
  }

  if (cowardLightOn) {
    document.addEventListener("mousemove", followMouse);
    if (!countdownStarted) {
      startCountdown();  // Inicia a contagem regressiva quando a luz for ativada
      countdownStarted = true;
    }
  } else {
    document.removeEventListener("mousemove", followMouse);
  }
}

function createChaosButtons() {
  const chaosContainer = document.getElementById("chaos-container");

  // Primeiro criamos o botão especial escondido
  const specialButton = document.createElement("button");
  specialButton.textContent = "APERTE"; // igual aos outros
  specialButton.className = "chaos-button special"; // adiciona uma classe especial
  specialButton.style.position = "absolute";
  specialButton.style.top = `${Math.random() * 90}%`;
  specialButton.style.left = `${Math.random() * 90}%`;
  specialButton.style.padding = "10px 20px";
  specialButton.style.fontSize = "1.2rem";
  specialButton.dataset.reveal = "false";

  specialButton.addEventListener("click", () => {
    chaosContainer.remove(); // tira o caos
    stopBackgroundAndLanternEffect(); // chama a função para parar a imagem e o efeito de lanterna
    continueStoryFromSpecialButton(); // chama a função para continuar a história
  });

  chaosContainer.appendChild(specialButton);

  // Agora criamos os outros botões normais
  for (let i = 0; i < 29; i++) { // 29 porque já criamos 1 especial
    const btn = document.createElement("button");
    btn.textContent = "APERTE";
    btn.className = "chaos-button";
    btn.style.position = "absolute";
    btn.style.top = `${Math.random() * 90}%`;
    btn.style.left = `${Math.random() * 90}%`;
    btn.style.padding = "10px 20px";
    btn.style.fontSize = "1.2rem";
    btn.dataset.reveal = "false";

    btn.addEventListener("click", () => {
      chaosContainer.remove();
      showCowardEnding(); // clica num normal, vai para o final medroso
    });

    chaosContainer.appendChild(btn);
  }
}

function stopBackgroundAndLanternEffect() {
  // Parar o efeito da lanterna
  document.removeEventListener("mousemove", followMouse);  // Remove o evento de movimento do mouse

  // Parar a animação da lanterna (caso você tenha alguma animação CSS)
  const cozinha = document.getElementById("cozinha");
  cozinha.style.display = "none"; // Esconde a imagem da lanterna ou desativa o efeito

  const chaosContainer = document.getElementById("chaos-container");
  if (chaosContainer) chaosContainer.remove();

  // Se houver uma camada de fundo específica, você também pode removê-la:
  const backgroundLayer = document.getElementById("background-layer");
  if (backgroundLayer) {
    backgroundLayer.style.display = "none"; // Esconde a camada de fundo
  }

  // Parar a contagem regressiva
  clearInterval(countdownTimer);  // Limpa o intervalo da contagem regressiva
  const countdownDisplay = document.getElementById("countdown-display");
  if (countdownDisplay) {
    countdownDisplay.textContent = "Contagem regressiva interrompida";  // Exibe uma mensagem indicando que a contagem foi interrompida
  }

  // Parar as músicas
  const musicElements = [
    bgMusic,
    creepySound,
    scaryMusic,
    heart,
    newMusic,
    fnafMiniGameSound,
    mysterious,
    fear
  ];

  // Interrompe todas as músicas que estão tocando
  musicElements.forEach(music => {
    if (music && !music.paused) {
      music.pause();  // Pausa a música
      music.currentTime = 0;  // Reseta o tempo da música para o início
    }
  });

    // Esconde o botão "Luz"
    const medrosoBtn = document.getElementById("Medroso");
    if (medrosoBtn) {
      medrosoBtn.style.display = "none"; // Isso vai esconder o botão "Luz"
    }
}

function followMouse(e) {
  const cozinha = document.getElementById("cozinha");
  cozinha.style.setProperty('--x', `${e.clientX}px`);
  cozinha.style.setProperty('--y', `${e.clientY}px`);

  const buttons = document.querySelectorAll(".chaos-button");

  buttons.forEach((btn) => {
    const rect = btn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;
    const distance = Math.sqrt((e.clientX - btnX) ** 2 + (e.clientY - btnY) ** 2);

    if (distance < 100) {
      btn.classList.add("visible"); // Torna o botão visível
    } else {
      btn.classList.remove("visible"); // Torna o botão invisível
    }
  });
}

let cowardEndingStarted = false; // <- variável de controle no começo do seu script

function showCowardEnding() {
  if (cowardEndingStarted) return; // Se já chamou, não chama de novo
  cowardEndingStarted = true; // Marca que já começou

  gameScreen.classList.add("hidden");
  
  // Pausa as músicas
  bgMusic.pause();
  creepySound.pause();
  scaryMusic.pause();
  heart.pause();
  newMusic.pause();
  fnafMiniGameSound.pause();
  mysterious.pause();
  fear.pause();

  // Exibe o vídeo
  const videoContainer = document.getElementById("gameover-video-container");
  const video = document.getElementById("gameover-video");

  videoContainer.classList.remove("hidden");
  video.currentTime = 0; // Garante que o vídeo comece do início
  video.play();

  // Quando o vídeo terminar, mostra a tela final
  video.onended = () => {
    videoContainer.classList.add("hidden");
    const cowardEnding = document.getElementById("coward-ending");
    cowardEnding.classList.remove("hidden");

    const gameOverMusic = document.getElementById("game-over-music");
    gameOverMusic.play();
  };
}


// Ligação dos botões
const backToStartBtn = document.getElementById("back-to-start-btn");
backToStartBtn.addEventListener("click", () => {
  document.getElementById("coward-ending").classList.add("hidden");
  restartGame();
});

// Função que inicia a contagem regressiva
function startCountdown() {
  const timeLimit = 10; // 10 segundos de contagem
  let remainingTime = timeLimit;
  
  // Exibe a contagem regressiva na tela ou no console
  const countdownDisplay = document.getElementById("countdown-display");
  countdownDisplay.textContent = `Tempo restante: ${remainingTime}s`;

  // Atualiza a contagem a cada segundo
  countdownTimer = setInterval(() => {
    remainingTime--;
    countdownDisplay.textContent = `Tempo restante: ${remainingTime}s`;

    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      if (!isButtonClicked) {
        showCowardEnding(); // Chama a função showCowardEnding em vez de showGameOver
      }
    }
  }, 1000);
}

// Função chamada quando qualquer botão é clicado
function onButtonClick() {
  isButtonClicked = true;
  clearInterval(countdownTimer); // Interrompe a contagem regressiva
  // Continue com o fluxo normal, por exemplo, avançar na história ou cena
  // Exemplo: nextStory();
}

// Adicionando o evento de clique para os botões de caos
document.querySelectorAll(".chaos-button").forEach((button) => {
  button.addEventListener("click", onButtonClick);
});

function continueStoryFromSpecialButton() {
  const gameOverMusic = document.getElementById("game-over-music");
  gameOverMusic.play();
  // Esconde a tela de caos
  const chaosContainer = document.getElementById("chaos-container");
  if (chaosContainer) chaosContainer.remove();

  // Reseta o estado
  clearInterval(countdownTimer);
  isButtonClicked = true;

  // Exibe a frase da história
  const storyText = document.getElementById("story-text");
  storyText.textContent = "Inacreditável! Você sobreviveu a todos os monstros, pulou pela janela e foi correndo o mais distânte possível da mansão.";

  // Esconde o botão de avanço
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.classList.add("hidden");

  // Exibe a tela de "Fim Sortudo"
  const gameOverScreen = document.createElement("div");
  gameOverScreen.className = "game-over-screen";
  gameOverScreen.innerHTML = `
    <section>
    <h2>Final Sortudo</h2>
    </section>
    <h3>Parabens 🎉🎉✨</h3>
  `;
  document.body.appendChild(gameOverScreen);
}