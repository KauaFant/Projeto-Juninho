const startBtn = document.getElementById("start-btn");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const bgMusic = document.getElementById("bg-music");
const creepySound = document.getElementById("creepy-sound");
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
const run = document.getElementById("run");
const escolha = document.getElementById("escolhas");
const alone = document.getElementById("Evil");
const aloneEnd = document.getElementById("end");
const aloneEnd2 = document.getElementById("Evil2");
const gameOverMusic = document.getElementById("game-over-music");

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
  "Mesmo com a porta trancada, você ainda sente medo..",
  "As paredes do quarto ficam mais escuras",
  "Parece que quarto não é mais seguro..",
  "Melhor ir pro corredor e subir para o sótão",
  "Você sai do quarto.."
];

const sotao = [
  "Assustado!! Você chegou ao sótão",
  "O ambiente esta escuro, você começa escutar barulhos estranhos",
  "Parecem sussurros pedindo por ajuda",
  "Com a lanterna ligada, você começa a procurar a fonte da voz.."
];

const sotao2 = [
  "Você se assusta com o que acabou de ver",
  "Pois isso lhe lembra muito o que acabou de segui-lo",
  "Mas ele não aparenta ser perigoso e parece estar danificado",
  "Você se aproxima para checar",
  "Nesse momento, ele se levanta e vem em sua direção pedindo ajuda",
  "Você cai para trás, assustado, e avista um taco de beisebol",
  "Você se vê diante a um impasse"
];

const evil = [
  "Você ataca ele, ele chora e implora por ajuda",
  "Você continua batendo nele. Você destrói ele.",
  "Voce percebe que pode destrui-los...",
  "Então você vai atrás dos outros..."
];

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextStory);
choice1Btn.addEventListener("click", chooseOption1);
choice2Btn.addEventListener("click", chooseOption2);

function startGame() {
  intro.currentTime = 0;
  intro.play();
  startScreen.classList.add("fade-out");
  startScreen.style.transition = "opacity 2s ease";
  startScreen.style.opacity = "0";

  setTimeout(() => {
    intro.pause();
    intro.currentTime = 0;
    startScreen.classList.add("hidden");
    const medrosoBtn = document.getElementById("Medroso");
    medrosoBtn.classList.add("hidden");
    medrosoBtn.classList.remove("active");
    medrosoBtn.style.pointerEvents = "none";

    gameScreen.classList.remove("hidden");
    bgMusic.play();
    storyIndex = 0;
    showStory();
    nextBtn.classList.remove("hidden");
    backBtn.classList.remove("hidden");
    startScreen.classList.remove("fade-out");
  }, 2000);
}

function nextStory() {
  if (currentPath) {
    pathIndex++;
    if (pathIndex < currentPath.length) {
      storyText.textContent = currentPath[pathIndex];

      if (currentPath[pathIndex] === "Você sai do quarto..") {
        gameScreen.classList.add("hidden");
        startChaseMinigame();
        return;
      }

      if (currentPath[pathIndex] === "Parece que o jogo acabou...") {
        const luzBtn = document.getElementById("Medroso");
        luzBtn.classList.remove("hidden");
        luzBtn.classList.add("visible");
        heart.currentTime = 0;
        heart.play();
        startFnafChaos();
        return;
      }
      if (currentPath[pathIndex] === "Você quer ir?") {
        nextBtn.classList.add("hidden");
        choicesDiv.classList.add("hidden");
      
        const newGameButtons = document.getElementById("new-game-buttons");
        newGameButtons.style.display = "block";
      
        const yesButton = document.getElementById("yes");
        const noButton = document.getElementById("no");
      
        yesButton.onclick = () => {
          currentPath = [
            "Você decide ajudar a voz desconhecida.",
            "Parece que na parede tem um enigma",
            "Você fica confuso e decide ajudar"
          ];
          pathIndex = 0;
          storyText.textContent = currentPath[pathIndex];
      
          newGameButtons.style.display = "none";
          nextBtn.classList.remove("hidden");
        };
      
        noButton.onclick = () => {
          currentPath = [
            "Você decide não confiar na voz misteriosa.",
            "Você corre para longe da voz.",
            "Você entra na cozinha... Mas..",
            "Quando você abre a porta, você vê muitos monstros... te observando...",
            "Parece que o jogo acabou..."
          ];
          pathIndex = 0;
          storyText.textContent = currentPath[pathIndex];
      
          newGameButtons.style.display = "none";
          nextBtn.classList.remove("hidden");
        };
      }

      if (storyText.textContent === "Você liga sua lanterna, olha para a porta com medo.") {
        document.body.classList.add('background-image');
      } else {
        document.body.classList.remove('background-image');
      }

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

      if (storyText.textContent === "Você cai para trás, assustado, e avista um taco de beisebol") {
        escolha.pause();
        escolha.currentTime = 0;
        alone.currentTime = 0;
        alone.play();
      }

    } else {
      currentPath = null;
      nextBtn.classList.add("hidden");
      bgMusic.pause();
      document.body.classList.remove('background-image');
    }
  } else {
    storyIndex++;
    if (storyIndex < storyLines.length) {
      showStory();

      if (storyLines[storyIndex] === "Barulhos estranhos aparecem, aparentemente vêm da sala.") {
        creepySound.currentTime = 0;
        creepySound.play();
      }

    } else {
      nextBtn.classList.add("hidden");
      alert("Fim do jogo! Obrigado por jogar.");
      bgMusic.pause();
      document.body.classList.remove('background-image');
    }
  }
  if (storyText.textContent === "Você finalmente chega no andar de baixo. Está escuro, seu coração bate mais forte") {
    heart.volume = 0.0;
    heart.playbackRate = 2.0;
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
    newMusic.pause();
    newMusic.currentTime = 0
  }

  if (storyText.textContent === "Então você vai atrás dos outros...") {
    const overlay = document.createElement("div");
    overlay.id = "fade-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "black";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 2s ease";
    overlay.style.zIndex = "10000";
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 0);

    setTimeout(() => {
      document.body.removeChild(overlay);
      iniciarMiniGameInimigos();
    }, 2000);

    return;
  }

  if (currentPath && currentPath[pathIndex] === "Com a lanterna ligada, você começa a procurar a fonte da voz..") {
    const overlay = document.createElement("div");
    overlay.id = "fade-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "black";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 3s ease";
    overlay.style.zIndex = "10000";
    document.body.appendChild(overlay);
  
    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 0);
  
    setTimeout(() => {
      document.body.removeChild(overlay);
      gameScreen.classList.add("hidden");
      lanternMinigame.classList.remove("hidden");
      flashlightEnabled = false;
      lightReveal.style.display = "none";
    }, 3000);

    lanternCanvas.addEventListener("mousemove", lanternaSotao);
  
    return;
  }

  if (storyText.textContent === "A maçaneta da porta se move sozinha.") {
    heart.currentTime = 0;
    heart.play();
  }

  if (storyText.textContent === "Você se vê diante a um impasse") {
    nextBtn.classList.add("hidden");
    
    const impasseButtons = document.getElementById("impasse-buttons");
    impasseButtons.classList.remove("hidden");
  
    setTimeout(() => {
      impasseButtons.classList.add("visible");
    }, 10);
  
    return;
  }

  if (storyText.textContent === "Você sente mais medo..") {
    newMusic.currentTime = 0;
    newMusic.play();
    gameScreen.classList.add("hidden");
    document.getElementById("minigame-room").classList.remove("hidden");
    iniciarMiniGame();
    return;
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

  if (storyText.textContent === "Você fica confuso e decide ajudar") {
    nextBtn.classList.add("hidden");
    document.getElementById("enigma-minigame").classList.remove("hidden");
    return;
  }

  if (storyText.textContent === "Você entra com cautela.") {
    iniciarMoveMinigame();
    return;
  }
}

function showStory() {
  storyText.textContent = storyLines[storyIndex];
  if (storyText.textContent === "Você finalmente chega no andar de baixo. Está escuro, seu coração bate mais forte") {
    heart.volume = 0.1;
    heart.playbackRate = 2.0;
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

  if (storyLines[storyIndex] === "Você liga sua lanterna, olha para a porta com medo.") {
    document.body.classList.add('background-image');
  } else {
    document.body.classList.remove('background-image');
  }

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

  const teclasPressionadas = {};

  function verificarColisao(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(
      aRect.right < bRect.left ||
      aRect.left > bRect.right ||
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom
    );
  }

  function moverPlayer() {
    if (teclasPressionadas["ArrowLeft"]) {
      posX = Math.max(limiteX.min, posX - 5);
    }
    if (teclasPressionadas["ArrowRight"]) {
      posX = Math.min(limiteX.max, posX + 5);
    }
    if (teclasPressionadas["ArrowUp"]) {
      posY = Math.min(limiteY.max, posY + 5);
    }
    if (teclasPressionadas["ArrowDown"]) {
      posY = Math.max(limiteY.min, posY - 5);
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
      document.removeEventListener("keyup", handleKeyup);
      clearInterval(gameLoop);
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
        document.removeEventListener("keyup", handleKeyup);
        clearInterval(gameLoop);
        bgMusic.play();
      } else {
        alert("A porta está trancada. Encontre a chave!");
      }
    }
  }

  const handleKeydown = (e) => {
    teclasPressionadas[e.key] = true;
  };

  const handleKeyup = (e) => {
    teclasPressionadas[e.key] = false;
  };

  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);

  const gameLoop = setInterval(moverPlayer, 20);
}

function startChaseMinigame() {
  const canvas = document.getElementById("chase-minigame");
  const ctx = canvas.getContext("2d");
  canvas.classList.remove("hidden");

  run.loop = true;
  run.play();

  [bgMusic, creepySound, newMusic, fnafMiniGameSound, mysterious, fear, heart].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 60,
    height: 60,
    speed: 3.5,
    color: "#00ff00"
  };

  const enemy = {
    x: 50,
    y: 50,
    width: 60,
    height: 60,
    speed: 2.4,
    color: "#ff0000"
  };

  const key = {
    x: 100,
    y: 300,
    width: 30,
    height: 30,
    collected: false
  };

  const door = {
    x: canvas.width - 100,
    y: canvas.height / 2 - 40,
    width: 70,
    height: 80,
    opened: false
  };

  let hasKey = false;

  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  };

  function handleKeydown(e) {
    if (e.key in keys) keys[e.key] = true;
  }

  function handleKeyup(e) {
    if (e.key in keys) keys[e.key] = false;
  }

  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);

  function checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  function updateEnemy() {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
      enemy.x += (dx / distance) * enemy.speed;
      enemy.y += (dy / distance) * enemy.speed;
    }
  }

  const playerImage = new Image();
  playerImage.src = "https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/f/fd/Regular.gif/revision/latest/smart/width/300/height/300?cb=20161103224927";

  const enemyImage = new Image();
  enemyImage.src = "https://static.wikia.nocookie.net/fnafapedia/images/e/e7/Spring_Freddy_Chomping.gif/revision/latest/scale-to-width-down/250?cb=20240106173010";

  const keyImage = new Image();
  keyImage.src = "https://media.tenor.com/JfiEuZyOJX4AAAAj/key-turning.gif";

  const doorImage = new Image();
  doorImage.src = "img/sótão.png"

  function gameLoop() {
    if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
    if (keys.ArrowDown && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

    updateEnemy();

    if (checkCollision(player, enemy)) {
      endMinigame();
      playDeathVideo();
      return;
    }

    if (!key.collected && checkCollision(player, key)) {
      key.collected = true;
      hasKey = true;
    }

    if (checkCollision(player, door)) {
      if (hasKey) {
        endMinigame();
        alert("Você escapou com sucesso!");
        return;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (playerImage.complete) {
      ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    } else {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    if (enemyImage.complete) {
      ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
    } else {
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    if (!key.collected) {
      if (keyImage.complete) {
        ctx.drawImage(keyImage, key.x, key.y, key.width, key.height);
      } else {
        ctx.fillStyle = "yellow";
        ctx.fillRect(key.x, key.y, key.width, key.height);
      }
    }

    if (doorImage.complete) {
      ctx.drawImage(doorImage, door.x, door.y, door.width, door.height);
    } else {
      ctx.fillStyle = "brown";
      ctx.fillRect(door.x, door.y, door.width, door.height);
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  function endMinigame() {
    canvas.classList.add("hidden");
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keyup", handleKeyup);
    run.pause();
    run.currentTime = 0;
  
    currentPath = sotao;
    pathIndex = 0;
    storyText.textContent = currentPath[pathIndex];
    gameScreen.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    escolha.currentTime = 0;
    escolha.play();
  }

  function showDeathScreen() {
    deathScreen.classList.remove("hidden");
    const deathText = document.getElementById("death-text");
    deathText.classList.remove("hidden");
  }

  function playDeathVideo() {
    const videoContainer = document.getElementById("videoChaseContainer");
    const video = document.getElementById("videoChase");
    nextBtn.classList.add("hidden");
    videoContainer.classList.remove("hidden");
    video.play();
  
    video.onended = () => {
      videoContainer.classList.add("hidden");
      showDeathScreen();
    };
  }
  
}

const fnafScene = document.getElementById("fnaf4-scene");
const fnafCanvas = document.getElementById("fnaf4-canvas");
const flashlightBtn = document.getElementById("flashlight-btn");
const dangerBtn = document.getElementById("danger-btn");

let flashlightOn = false;
let dangerTimeout;

function startFnafScene() {
  bgMusic.pause();
  creepySound.pause();
  fnafMiniGameSound.currentTime = 0;
  fnafMiniGameSound.play();
  document.body.style.transition = "opacity 2s ease";
  document.body.style.opacity = "0";
  
  setTimeout(() => {
    gameScreen.classList.add("hidden");
    fnafScene.classList.remove("hidden");
    document.body.style.opacity = "1";
  }, 2000);
  
  flashlightOn = false;
  dangerBtn.classList.add("hidden");
  
  dangerTimeout = setTimeout(() => {
    endFnafScene();
  }, 18000);
}

fnafCanvas.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = 100;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < radius) {
    dangerBtn.style.display = "block";
  } else {
    dangerBtn.style.display = "none";
  }
});

flashlightBtn.addEventListener("click", () => {
  flashlightOn = !flashlightOn;
  
  backBtn.addEventListener("click", () => {
    lightReveal.style.display = "none";
  });
  
  retryBtn.addEventListener("click", () => {
    lightReveal.style.display = "none";
  });
  
  if (flashlightOn) {
    fnafCanvas.addEventListener("mousemove", moveLantern);
    fnafCanvas.style.background = "none";
    fnafLightReveal.style.display = "block";
    lanternOn = true;
    flashlightBtn.classList.add("active");
    fnafCanvas.style.cursor = "none";
  } else {
    fnafCanvas.removeEventListener("mousemove", moveLantern);
    fnafCanvas.style.background = "black";
    fnafLightReveal.style.display = "none";
    lanternOn = false;
    flashlightBtn.classList.remove("active");
    fnafCanvas.style.cursor = "default";
  }
  
  if (flashlightOn) {
    dangerBtn.classList.remove("hidden");
  } else {
    dangerBtn.classList.add("hidden");
  }
});

dangerBtn.addEventListener("click", () => {
  clearTimeout(dangerTimeout);
  fnafScene.classList.add("hidden");
  fnafMiniGameSound.pause();
  fnafMiniGameSound.currentTime = 0;
  const videoContainer = document.getElementById("video-container");
  const scaryVideo = document.getElementById("scary-video");
  videoContainer.classList.remove("hidden");
  scaryVideo.currentTime = 0;
  scaryVideo.play();
  scaryVideo.onended = () => {
    videoContainer.classList.add("hidden");
    deathScreen.classList.remove("hidden");
    const deathText = document.getElementById("death-text");
    deathText.classList.remove("hidden");
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
  element.classList.add("typing-rosa");

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
  console.log("Botão Luz foi clicado!");
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
      startCountdown();
      countdownStarted = true;
    }
  } else {
    document.removeEventListener("mousemove", followMouse);
  }
}

function createChaosButtons() {
  const chaosContainer = document.getElementById("chaos-container");

  const specialButton = document.createElement("button");
  specialButton.textContent = "APERTE";
  specialButton.className = "chaos-button special";
  specialButton.style.position = "absolute";
  specialButton.style.top = `${Math.random() * 90}%`;
  specialButton.style.left = `${Math.random() * 90}%`;
  specialButton.style.padding = "10px 20px";
  specialButton.style.fontSize = "1.2rem";
  specialButton.dataset.reveal = "false";

  specialButton.addEventListener("click", () => {
    chaosContainer.remove();
    stopBackgroundAndLanternEffect();
    continueStoryFromSpecialButton();
  });

  chaosContainer.appendChild(specialButton);

  for (let i = 0; i < 29; i++) {
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
      showCowardEnding();
    });

    chaosContainer.appendChild(btn);
  }
}

function stopBackgroundAndLanternEffect() {
  document.removeEventListener("mousemove", followMouse);
  const cozinha = document.getElementById("cozinha");
  cozinha.style.display = "none";
  const chaosContainer = document.getElementById("chaos-container");
  if (chaosContainer) chaosContainer.remove();
  const backgroundLayer = document.getElementById("background-layer");
  if (backgroundLayer) {
    backgroundLayer.style.display = "none";
  }
  clearInterval(countdownTimer);
  const countdownDisplay = document.getElementById("countdown-display");
  if (countdownDisplay) {
    countdownDisplay.textContent = "Contagem regressiva interrompida";
  }
  const musicElements = [
    bgMusic,
    creepySound,
    heart,
    newMusic,
    fnafMiniGameSound,
    mysterious,
    fear
  ];
  musicElements.forEach(music => {
    if (music && !music.paused) {
      music.pause();
      music.currentTime = 0;
    }
  });
  const medrosoBtn = document.getElementById("Medroso");
  if (medrosoBtn) {
    medrosoBtn.style.display = "none";
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
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });
}

let cowardEndingStarted = false;

function showCowardEnding() {
  if (cowardEndingStarted) return;
  cowardEndingStarted = true;
  gameScreen.classList.add("hidden");
  bgMusic.pause();
  creepySound.pause();
  heart.pause();
  newMusic.pause();
  fnafMiniGameSound.pause();
  mysterious.pause();
  fear.pause();
  const videoContainer = document.getElementById("gameover-video-container");
  const video = document.getElementById("gameover-video");
  videoContainer.classList.remove("hidden");
  video.currentTime = 0;
  video.play();
  video.onended = () => {
    videoContainer.classList.add("hidden");
    const cowardEnding = document.getElementById("coward-ending");
    cowardEnding.classList.remove("hidden");
    gameOverMusic.play();
  };
}

const backToStartBtn = document.getElementById("back-to-start-btn");
backToStartBtn.addEventListener("click", () => {
  document.getElementById("coward-ending").classList.add("hidden");
  restartGame();
});

function startCountdown() {
  const timeLimit = 10;
  let remainingTime = timeLimit;
  const countdownDisplay = document.getElementById("countdown-display");
  countdownDisplay.textContent = `Tempo restante: ${remainingTime}s`;
  countdownTimer = setInterval(() => {
    remainingTime--;
    countdownDisplay.textContent = `Tempo restante: ${remainingTime}s`;
    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      if (!isButtonClicked) {
        showCowardEnding();
      }
    }
  }, 1000);
}

function onButtonClick() {
  isButtonClicked = true;
  clearInterval(countdownTimer);
}

document.querySelectorAll(".chaos-button").forEach((button) => {
  button.addEventListener("click", onButtonClick);
});

function continueStoryFromSpecialButton() {
  gameOverMusic.play();
  const chaosContainer = document.getElementById("chaos-container");
  if (chaosContainer) chaosContainer.remove();
  clearInterval(countdownTimer);
  isButtonClicked = true;
  const storyText = document.getElementById("story-text");
  storyText.textContent = "Inacreditável! Você sobreviveu a todos os monstros, pulou pela janela e foi correndo o mais distânte possível da mansão.";
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.classList.add("hidden");
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

const lanternMinigame = document.getElementById("lantern-minigame");
const lanternCanvas = document.getElementById("lanternCanvas");
const lightReveal = document.getElementById("lightReveal");
const flashlightToggle = document.getElementById("flashlightToggle");

let flashlightEnabled = false;

function lanternaSotao(e) {
  const rect = lanternCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  lightReveal.style.setProperty("--x", `${x}px`);
  lightReveal.style.setProperty("--y", `${y}px`);
}

lanternCanvas.addEventListener("mousemove", lanternaSotao);

flashlightToggle.addEventListener("click", () => {
  flashlightEnabled = !flashlightEnabled;
  lightReveal.style.display = flashlightEnabled ? "block" : "none";
  lanternCanvas.style.cursor = flashlightEnabled ? "none" : "default";
  flashlightToggle.classList.toggle("active", flashlightEnabled);
  hiddenObject.classList.toggle("hidden", !flashlightEnabled);
});

lanternCanvas.addEventListener("mousemove", moveLantern);

const hiddenObject = document.getElementById("hiddenObject");
let hoverTimeout;
hiddenObject.addEventListener("mouseenter", () => {
  hoverTimeout = setTimeout(() => {
    lanternMinigame.classList.add("hidden");
    lightReveal.style.display = "none";
    hiddenObject.classList.add("hidden");
    flashlightEnabled = false;
    lanternCanvas.style.cursor = "default";
    currentPath = sotao2;
    pathIndex = 0;
    storyText.textContent = currentPath[pathIndex];
    gameScreen.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }, 1500);
});

hiddenObject.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimeout);
});

document.getElementById("helpBtn").onclick = () => {
  gameOverMusic.currentTime = 0;
  gameOverMusic.play();
  document.getElementById("impasse-buttons").classList.add("hidden");
  nextBtn.classList.add("hidden");
  const screen = document.getElementById("dark-screen");
  const glowText = document.getElementById("glow-text");
  const bgImage = document.getElementById("dark-background");
  const deathVideo = document.getElementById("death-video");
  const deathScreen = document.getElementById("death-screen");
  screen.classList.remove("hidden");
  setTimeout(() => {
    screen.style.opacity = 1;
    glowText.style.opacity = 1;
    backBtn.classList.add("hidden");
    typeWriterGlow("Você percebe que não fez uma escolha boa☠️", glowText, 120);
  }, 100);
  setTimeout(() => {
    bgImage.classList.remove("hidden");
    void bgImage.offsetHeight;
    bgImage.classList.add("visible");
  }, 4000);
  setTimeout(() => {
    screen.classList.add("hidden");
    bgImage.classList.add("hidden");
    nextBtn.classList.add("hidden");
    backBtn.classList.add("hidden");
    deathVideo.classList.remove("hidden");
    deathVideo.play();
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0
  }, 15000);
  deathVideo.onended = () => {
    deathVideo.classList.add("hidden");
    deathScreen.classList.remove("hidden");
  };
};

document.getElementById("retry-btn").onclick = () => {
  location.reload();
};

function typeWriterGlow(text, element, speed = 150, callback = null) {
  let i = 0;
  element.textContent = "";
  element.style.opacity = 1;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

document.getElementById("killBtn").onclick = () => {
  document.getElementById("impasse-buttons").classList.add("hidden");
  nextBtn.classList.remove("hidden");
  backBtn.classList.remove("hidden");
  currentPath = evil;
  pathIndex = 0;
  storyText.textContent = currentPath[pathIndex];
};

function iniciarMiniGameInimigos() {
  const canvas = document.getElementById("chase-minigame");
  const ctx = canvas.getContext("2d");
  canvas.classList.remove("hidden");
  [bgMusic, creepySound, newMusic, fnafMiniGameSound, mysterious, fear, heart].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  const player = {
    x: canvas.width - 160,
    y: canvas.height / 2 - 30,
    width: 60,
    height: 60,
    speed: 3,
    color: "#00ff00"
  };
  const enemy = {
    x: 50,
    y: 50,
    width: 60,
    height: 60,
    speed: 4.5,
    color: "#ff0000"
  };
  const door = {
    x: canvas.width - 100,
    y: canvas.height / 2 - 40,
    width: 70,
    height: 80,
    opened: false
  };
  const teclasAtivas = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  };
  function handleKeydown(e) {
    if (e.key in teclasAtivas) teclasAtivas[e.key] = true;
  }
  function handleKeyup(e) {
    if (e.key in teclasAtivas) teclasAtivas[e.key] = false;
  }
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);
  function checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
  function updateEnemy() {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
      enemy.x += (dx / distance) * enemy.speed;
      enemy.y += (dy / distance) * enemy.speed;
    }
  }
  const playerImage = new Image();
  playerImage.src = "https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/f/fd/Regular.gif/revision/latest/smart/width/300/height/300?cb=20161103224927";
  const enemyImage = new Image();
  enemyImage.src = "https://static.wikia.nocookie.net/fnafapedia/images/e/e7/Spring_Freddy_Chomping.gif/revision/latest/scale-to-width-down/250?cb=20240106173010";
  const doorImage = new Image();
  doorImage.src = "img/sótão.png"
  function gameLoop() {
    if (teclasAtivas.ArrowUp && player.y > 0) player.y -= player.speed;
    if (teclasAtivas.ArrowDown && player.y < canvas.height - player.height) player.y += player.speed;
    if (teclasAtivas.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (teclasAtivas.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;
    updateEnemy();
    if (checkCollision(player, enemy)) {
      iniciarMiniGameBatalha();
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (playerImage.complete) {
      ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    } else {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    if (enemyImage.complete) {
      ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
    } else {
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
    if (doorImage.complete) {
      ctx.drawImage(doorImage, door.x, door.y, door.width, door.height);
    } else {
      ctx.fillStyle = "brown";
      ctx.fillRect(door.x, door.y, door.width, door.height);
    }
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

function iniciarMiniGameBatalha() {
  alone.pause();
  alone.currentTime = 0;
  aloneEnd.play();
  const canvas = document.getElementById("chase-minigame");
  const ctx = canvas.getContext("2d");
  const box = { x: canvas.width / 2 - 150, y: canvas.height / 2 - 100, width: 300, height: 200 };
  const heart = { x: box.x + box.width / 2 - 20, y: box.y + box.height / 2 - 20, size: 40, speed: 5 };
  const teclasBatalha = { up: false, down: false, left: false, right: false };
  const balas = [];
  let recebeuDano = false;
  let timerDano = 0;
  let vida = 100;
  let playerAlive = true;
  let balaSpeed = 3 + Math.random() * 2;
  let showMessage = false;
  let message = "";
  let messageIndex = 0;
  const messageText = "Você vai morrer";
  let lateralBalasAtivas = false;
  let damageEffectFrames = 0;
  let gameRunning = true;
  const heartImage = new Image();
  heartImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Undertale_red_soul.svg/2048px-Undertale_red_soul.svg.png';
  const topImage = new Image();
  topImage.src = 'img/fredão_chefe.gif';
  let heartImageLoaded = false;
  let topImageLoaded = false;
  function tryStart() {
    if (heartImageLoaded && topImageLoaded) {
      loopBatalha();
    }
  }
  heartImage.onload = () => { heartImageLoaded = true; tryStart(); };
  topImage.onload = () => { topImageLoaded = true; tryStart(); };
  function handle(e, isDown) {
    const tecla = e.key.toLowerCase();
    switch (tecla) {
      case 'arrowup': teclasBatalha.up = isDown; break;
      case 'arrowdown': teclasBatalha.down = isDown; break;
      case 'arrowleft': teclasBatalha.left = isDown; break;
      case 'arrowright': teclasBatalha.right = isDown; break;
    }
    e.preventDefault();
  }
  document.addEventListener("keydown", e => handle(e, true));
  document.addEventListener("keyup", e => handle(e, false));
  function criarBala() {
    if (!gameRunning) return;
    const spawnSide = Math.random();
    if (!lateralBalasAtivas || spawnSide < 0.5) {
      balas.push({ x: Math.random() * (canvas.width - 10), y: 0, width: 30, height: 30, speed: balaSpeed, direction: 'down' });
    } else if (spawnSide < 0.75) {
      balas.push({ x: 0, y: Math.random() * (canvas.height - 10), width: 30, height: 30, speed: balaSpeed, direction: 'right' });
    } else {
      balas.push({ x: canvas.width - 30, y: Math.random() * (canvas.height - 10), width: 30, height: 30, speed: balaSpeed, direction: 'left' });
    }
  }
  function moverBalas() {
    for (let i = balas.length - 1; i >= 0; i--) {
      const bala = balas[i];
      if (bala.direction === 'down') bala.y += bala.speed;
      else if (bala.direction === 'right') bala.x += bala.speed;
      else if (bala.direction === 'left') bala.x -= bala.speed;
      if (bala.x < -30 || bala.x > canvas.width + 30 || bala.y > canvas.height + 30) {
        balas.splice(i, 1);
      }
    }
  }
  function desenharBalas() {
    ctx.fillStyle = "yellow";
    for (const bala of balas) {
      ctx.fillRect(bala.x, bala.y, bala.width, bala.height);
    }
  }
  function checarColisaoBala() {
    for (let i = balas.length - 1; i >= 0; i--) {
      const b = balas[i];
      if (
        heart.x < b.x + b.width &&
        heart.x + heart.size > b.x &&
        heart.y < b.y + b.height &&
        heart.y + heart.size > b.y
      ) {
        vida -= 20;
        balas.splice(i, 1);
        damageEffectFrames = 6;
        recebeuDano = true;
        timerDano = 20;
        if (vida <= 0) playerAlive = false;
      }
    }
  }
  function desenharBox() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
  }
  function desenharHeart() {
    if (damageEffectFrames > 0) {
      if (damageEffectFrames % 2 === 0) {
        damageEffectFrames--;
        return;
      }
      damageEffectFrames--;
    }
    ctx.drawImage(heartImage, heart.x, heart.y, heart.size, heart.size);
  }
  function desenharTopImage() {
    ctx.drawImage(topImage, box.x + box.width / 2 - 75, box.y - 150, 170, 150);
  }
  function moverHeart() {
    if (teclasBatalha.up && heart.y > box.y) heart.y -= heart.speed;
    if (teclasBatalha.down && heart.y < box.y + box.height - heart.size) heart.y += heart.speed;
    if (teclasBatalha.left && heart.x > box.x) heart.x -= heart.speed;
    if (teclasBatalha.right && heart.x < box.x + box.width - heart.size) heart.x += heart.speed;
  }
  setInterval(criarBala, 1000);
  function typeMessage(callback) {
    if (messageIndex < messageText.length) {
      message += messageText.charAt(messageIndex++);
      setTimeout(() => typeMessage(callback), 250);
    } else {
      balaSpeed += 5;
      if (callback) callback();
      setTimeout(() => { showMessage = false; }, 4000);
    }
  }
  setTimeout(() => {
    showMessage = true;
    typeMessage();
  }, 16000);
  setTimeout(() => {
    setInterval(criarBala, 700);
    lateralBalasAtivas = true;
  }, 23000);
  setTimeout(() => {
    setInterval(criarBala, 500);
    lateralBalasAtivas = true;
  }, 30000);
  setTimeout(() => {
    gameRunning = false;
    finalizarMiniGameBatalha();
  }, 36000);
  function finalizarMiniGameBatalha() {
    aloneEnd.pause();
    aloneEnd.currentTime = 0;
    aloneEnd2.currentTime = 0;
    aloneEnd2.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const telaFinal = document.getElementById("tela-final");
    const botaoMatar = document.getElementById("botao-matar");
    const fadeOverlay = document.getElementById("fade-overlay");
    const videoFinal = document.getElementById("video-final");
    const telaEgo = document.getElementById("tela-ego");
    if (telaFinal) telaFinal.style.display = "flex";
    botaoMatar.onclick = () => {
      telaFinal.style.display = "none";
      fadeOverlay.style.opacity = "1";
      setTimeout(() => {
        fadeOverlay.style.opacity = "0";
        videoFinal.style.display = "block";
        videoFinal.play();
        videoFinal.onended = () => {
          fadeOverlay.style.opacity = "1";
          setTimeout(() => {
            videoFinal.style.display = "none";
            fadeOverlay.style.opacity = "0";
            if (telaEgo) telaEgo.style.display = "flex";
          }, 10000);
        };
      }, 10000);
    };
  }
  function loopBatalha() {
    if (!gameRunning || !playerAlive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharBox();
    desenharTopImage();
    moverHeart();
    desenharHeart();
    moverBalas();
    desenharBalas();
    checarColisaoBala();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Vida: " + vida, 20, 30);
    if (showMessage) {
      ctx.font = "30px Arial";
      ctx.fillText(message, canvas.width / 2 - ctx.measureText(message).width / 2, canvas.height / 2);
    }
    if (!playerAlive) {
      gameRunning = false;
      aloneEnd.pause();
      aloneEnd.currentTime = 0;
      const telaMorte = document.getElementById("tela-morte");
      if (telaMorte) {
        telaMorte.style.display = "flex";
      }
      return;
    }
    if (timerDano > 0) {
      ctx.fillStyle = "red";
      timerDano--;
    } else {
      ctx.fillStyle = "white";
    }
    ctx.font = "20px Arial";
    ctx.fillText("Vida: " + vida, 20, 30);
    requestAnimationFrame(loopBatalha);
  }
}

function verificarEnigma(resposta) {
  const feedback = document.getElementById("enigma-feedback");
  if (resposta === "mapa") {
    feedback.textContent = "Correto! Você pode continuar.";
    setTimeout(() => {
      document.getElementById("enigma-minigame").classList.add("hidden");
      nextBtn.classList.remove("hidden");
      currentPath = [
        "Você resolve o enigma e a parede começa a se mover.",
        "Atrás dela, há uma passagem secreta escura...",
        "Você entra com cautela."
      ];
      pathIndex = 0;
      storyText.textContent = currentPath[pathIndex];
    }, 2000);
  } else {
    feedback.textContent = "Errado! Tente novamente.";
  }
}

const moveMinigame = document.getElementById("move-minigame");
const moveCanvas = document.getElementById("moveCanvas");
const ctx = moveCanvas.getContext("2d");

moveCanvas.width = 800;
moveCanvas.height = 600;

const backgroundImg = new Image();
const playerImg = new Image();
const targetImg = new Image();

let player = { x: 100, y: 100, width: 50, height: 50 };
let target = { x: 700, y: 500, width: 50, height: 50 };
let keys = {};
let allImagesLoaded = 0;
let isMinigameActive = false;

function draw() {
  ctx.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
  if (backgroundImg.complete) {
    ctx.drawImage(backgroundImg, 0, 0, moveCanvas.width, moveCanvas.height);
  }
  if (targetImg.complete) {
    ctx.drawImage(targetImg, target.x, target.y, target.width, target.height);
  }
  if (playerImg.complete) {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  }
}

function update() {
  if (!isMinigameActive) return;
  if (keys["ArrowUp"] && player.y > 0) player.y -= 3;
  if (keys["ArrowDown"] && player.y + player.height < moveCanvas.height) player.y += 3;
  if (keys["ArrowLeft"] && player.x > 0) player.x -= 3;
  if (keys["ArrowRight"] && player.x + player.width < moveCanvas.width) player.x += 3;
  if (
    player.x < target.x + target.width &&
    player.x + player.width > target.x &&
    player.y < target.y + target.height &&
    player.y + player.height > target.y
  ) {
    isMinigameActive = false;
    endMoveMinigame();
    if (typeof mysterious !== "undefined") {
      mysterious.pause();
      mysterious.currentTime = 0;
    }
    return;
  }
  draw();
  requestAnimationFrame(update);
}

function checkLoaded() {
  allImagesLoaded++;
  if (allImagesLoaded === 3) {
    isMinigameActive = true;
    draw();
    requestAnimationFrame(update);
  }
}

function iniciarMoveMinigame() {
  allImagesLoaded = 0;
  backgroundImg.src = 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/822920/ss_ccfc465fcdebec08484f1eb1ae8bf8a6747bb4ad.1920x1080.jpg?t=1590204819';
  playerImg.src = 'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/f/fd/Regular.gif/revision/latest?cb=20161103224927';
  targetImg.src = 'https://static.wikia.nocookie.net/pizzaria-freddy-fazbear/images/0/0b/Baby_Sprite_Idle.gif/revision/latest?cb=20161011172021&path-prefix=pt-br';
  backgroundImg.onload = checkLoaded;
  playerImg.onload = checkLoaded;
  targetImg.onload = checkLoaded;
  if (typeof gameScreen !== "undefined") {
    gameScreen.classList.add("hidden");
  }
  moveMinigame.classList.remove("hidden");
  player.x = 100;
  player.y = 100;
}

function endMoveMinigame() {
  moveMinigame.classList.add("hidden");
  gameOverMusic.currentTime = 0;
  gameOverMusic.play();
  isMinigameActive = false;
  const morteScreen = document.getElementById("morte-screen");
  setTimeout(() => {
    morteScreen.classList.remove("hidden");
    morteScreen.classList.add("visible");
    if (!morteScreen.querySelector("back-btn")) {
      const backBtn = document.getElementById("back-btn").cloneNode(true);
      morteScreen.appendChild(backBtn);
      backBtn.onclick = function() {
        restartGame();
      };
    }
  }, 3000);
}

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);