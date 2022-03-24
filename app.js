const grid = document.querySelector('.grid');
const toggles = document.querySelectorAll('.switch');
let solution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let startState = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
		// win state
	}
}

function randomSolution() {
	for (let i = 0; i < 25; i++) {
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

// Interactions

grid.addEventListener('click', toggleSwitches);
grid.addEventListener('click', checkStatus);

// Init Game

randomSolution();
generateStartState();
initializeGame();
