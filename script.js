
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const scoreBoard = document.querySelector('.score');
const highscoreBoard = document.querySelector('.highScore');


let countdown;
let lastHole;
let timeLimit = 2000;
let timeUp = false;
let score = 0;
let highscore = localStorage.getItem('gameHighScore') || 0;
highscoreBoard.textContent = `HIGH SCORE: ${highscore}`;


function randomHole() {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole === lastHole) {
        return randomHole(); 
    }
    lastHole = hole;
    return hole;
}

// Function to make a mole pop out
function popOut() {
    const time = Math.random() * 1300 + 400; 
    const hole = randomHole();
    hole.classList.add('up'); 
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) popOut(); 
    }, time);
}


function startGame() {
    countdown = 10; 
    scoreBoard.textContent = 0;
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();

    let startCountdown = setInterval(() => {
        countdown--;
        countdownBoard.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(startCountdown);
            countdownBoard.textContent = "Time is Up!";
            timeUp = true;
            checkHighScore();
        }
    }, 1000);
}


function moleWhack() {
    score++;
    this.style.backgroundImage = 'url("mole2.png")'; 
    scoreBoard.textContent = score;
    setTimeout(() => {
        this.style.backgroundImage = 'url("mole.png")'; 
    }, 800);
}


function checkHighScore() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('gameHighScore', highscore); 
        highscoreBoard.textContent = `HIGH SCORE: ${highscore}`;
    }
}

// Event listeners
startButton.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', moleWhack));
