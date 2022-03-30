// Selectors

const overlay = document.querySelector('.overlay');
const grid = document.querySelector('.grid');
const toggles = document.querySelectorAll('.switch');
const menu = document.querySelector('#menu');
const instructions = document.querySelector('#instructions');
const dismiss = document.querySelector('.modal__dismiss');
const win = document.querySelector('#win');
const restart = document.querySelector('#restart');

// Global variables

let solution = [];
let startState = [];

// Functions

function toggleSwitches(event) {
    if (event.target.classList.contains('switch')) {
        let index = 1 + Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
        
        if (index <= 20) { grid.querySelector(`.switch:nth-child(${index + 5})`).checked = !grid.querySelector(`.switch:nth-child(${index + 5})`).checked; } // bottom
        if ((index - 1) % 5 != 0) { grid.querySelector(`.switch:nth-child(${index - 1})`).checked = !grid.querySelector(`.switch:nth-child(${index - 1})`).checked; } // left
        if (index > 5) { grid.querySelector(`.switch:nth-child(${index - 5})`).checked = !grid.querySelector(`.switch:nth-child(${index - 5})`).checked; } // top
        if (index % 5 != 0) { grid.querySelector(`.switch:nth-child(${index + 1})`).checked = !grid.querySelector(`.switch:nth-child(${index + 1})`).checked; } // right
    }
}

function checkStatus() {
    let status = true;
	
	toggles.forEach(toggle => {
		if (!toggle.checked) {
			status = false;
		}
	});
	
	if (status) {
		showWin();
	}
}

function randomSolution() {
	for (let i = 0; i < 25; i++) {
		// reset arrays
		solution[i] = 0;
		startState[i] = 1;

		// random input
		solution[i] = Math.round(Math.random());
	}
}

function generateStartState() {
	for (let i = 0; i < 25; i++) {
		if (solution[i] == 1) {
			if (startState[i] == 1) { startState[i] = 0; } else { startState[i] = 1; };
			if ((i + 1) <= 20) { if (startState[(i + 5)] == 1) { startState[(i + 5)] = 0; } else { startState[(i + 5)] = 1; }} // bottom
			if ((i % 5) != 0) { if (startState[(i - 1)] == 1) { startState[(i - 1)] = 0; } else { startState[(i - 1)] = 1; }} // left
			if ((i + 1) > 5) { if (startState[(i - 5)] == 1) { startState[(i - 5)] = 0; } else { startState[(i - 5)] = 1; }} // top
			if ((i + 1) % 5 != 0) { if (startState[(i + 1)] == 1) { startState[(i + 1)] = 0; } else { startState[(i + 1)] = 1; }} // right
		}
	}
}

function initializeGame() {
	let index = 0;
	toggles.forEach(toggle => {
		if (startState[index]) {
			grid.querySelector(`.switch:nth-child(${index + 1})`).checked = true;
		} else {
			grid.querySelector(`.switch:nth-child(${index + 1})`).checked = false;
		}
		index++;
	});
}

function showInstructions() {
	overlay.classList.add('overlay--active');
	instructions.classList.add('modal--active');
}

function dimissInstructions() {
	overlay.classList.remove('overlay--active');
	instructions.classList.remove('modal--active');
}

function showWin() {
	overlay.classList.add('overlay--active');
	win.classList.add('modal--active');
}

function newGame() {
	overlay.classList.remove('overlay--active');
	win.classList.remove('modal--active');

	randomSolution();
	generateStartState();
	initializeGame();
}

// Interactions

menu.addEventListener('click', showInstructions);
dismiss.addEventListener('click', dimissInstructions);
grid.addEventListener('click', toggleSwitches);
grid.addEventListener('click', checkStatus);
restart.addEventListener('click', newGame);

// Init Game

newGame();