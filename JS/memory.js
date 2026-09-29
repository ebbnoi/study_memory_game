const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-button");

let imgDimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;

const images = [];
for (let i = imgStart; i <= imgStart + 7; i++) {
    images.push(`https://picsum.photos/seed/${i}/${imgDimension}/${imgDimension}`);
}

cards = [...images, ...images];

initGame();

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // On échange les deux places
    }
}

function initGame() {
    moves = 0;
    board.innerHTML = "";
    resultDisplay.textContent = "";
    movesDisplay.textContent = `Coups: ${moves}`;
    timerDisplay.textContent = `Temps: 00:00`;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedCount = 0;
    timerInterval = null;
    seconds = 0;

    shuffle(cards);
    
    cards.forEach((imgUrl) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.dataset.value = imgUrl; // On cache l'URL de l'image dans la carte
        board.appendChild(card);
        // Quand on clique, on appelle la fonction de gestion du clic
        card.addEventListener("click", () => handleCardClick(card));
    });
    
}

function handleCardClick(card) {
    if (lockBoard || card === firstCard || card.firstChild ||card.classList.contains("matched"))
    {
        return;
    }
    if (timerInterval === null) {
        startTimer();
    }
    
    reveal(card);
    
    if (firstCard === null)
    {
        firstCard = card;
    }
    else 
    {
        secondCard = card;
        lockBoard = true;
        moves++;
        movesDisplay.textContent = `Coups : ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount += 2;
        resetTurn();
        checkVictory();

    } else {
        setTimeout(()  => {
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function reveal(card) {
    const img = document.createElement("img");
    img.src = card.dataset.value;
    img.alt = "image de la carte de memory";
    card.appendChild(img);
}

function formatTime(sec) {
    let s = sec % 60;
    let m = Math.trunc(sec/60);
    
    let s_str = String(s).padStart(2, '0');
    
    let m_str = String(m).padStart(2, '0');

    return m_str + ':' + s_str;
    
}

function startTimer() {
    let timer = () => {
        seconds++;
        timerDisplay.innerHTML = `Temps: ${formatTime(seconds)}`;
    }
    timerInterval = setInterval(timer, 1000);
}

function checkVictory() {
    if (matchedCount == 16) {
        clearInterval(timerInterval);
        resultDisplay.innerHTML = `Gagné en ${moves} coups, en ${Math.trunc(seconds/60)} minutes et ${seconds %60} secondes`;
    }
}

restartBtn.innerHTML = "Réinitialiser le jeu";
restartBtn.addEventListener("click", initGame);