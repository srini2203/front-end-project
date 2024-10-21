// Get references to the HTML elements
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const scoreBoard = document.querySelector('.score');
const highscoreBoard = document.querySelector('.highScore');

// Game variables
let countdown;
let lastHole;
let timeLimit = 2000;
let timeUp = false;
let score = 0;
let highscore = localStorage.getItem('gameHighScore') || 0;
highscoreBoard.textContent = `HIGH SCORE: ${highscore}`;

// Function to generate a random hole for the mole to pop up from
function randomHole() {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole === lastHole) {
        return randomHole(); // Prevent the same hole from being selected twice
    }
    lastHole = hole;
    return hole;
}

// Function to make a mole pop out
function popOut() {
    const time = Math.random() * 1300 + 400; // Random pop-up time
    const hole = randomHole();
    hole.classList.add('up'); // Make mole come up
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) popOut(); // Keep popping moles until time is up
    }, time);
}

// Start the game
function startGame() {
    countdown = 10; // Set initial countdown to 10 seconds
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

// Mole whack event
function moleWhack() {
    score++;
    this.style.backgroundImage = 'url("mole2.png")'; // Change image when mole is hit
    scoreBoard.textContent = score;
    setTimeout(() => {
        this.style.backgroundImage = 'url("mole.png")'; // Reset image after 800ms
    }, 800);
}

// Check if the current score is higher than the high score
function checkHighScore() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('gameHighScore', highscore); // Store new highscore in localStorage
        highscoreBoard.textContent = `HIGH SCORE: ${highscore}`;
    }
}

// Event listeners
startButton.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', moleWhack));
