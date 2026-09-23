const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let img_dimension = 150;
let img_start = Math.floor(Math.random() * 100) + 1;
let cards = [];
let first_card = null;
let second_card = null;
let lock_board = false;
let moves = 0;
let matched_count = 0;
let seconds = 0;
let timer_interval = null;

const images = [];
for (let i = img_start; i <= img_start + 7; i++) {
    images.push(`https://picsum.photos/seed/${i}/${img_dimension}/${img_dimension}`);
}

cards = [...images, ...images];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // On échange les deux places
    }
}

//push on git and create repo on github