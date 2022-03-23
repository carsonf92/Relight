const grid = document.querySelector('.grid');
const toggles = document.querySelectorAll('.switch');

function toggleSwitches(event) {
    if (event.target.classList.contains('switch')) {
        let index = 1 + Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
        
        if (index <= 20) { grid.querySelector(`.switch:nth-child(${index + 5})`).checked = !grid.querySelector(`.switch:nth-child(${index + 5})`).checked; } // top
        if ((index - 1) % 5 != 0) { grid.querySelector(`.switch:nth-child(${index - 1})`).checked = !grid.querySelector(`.switch:nth-child(${index - 1})`).checked; } // right
        if (index > 5) { grid.querySelector(`.switch:nth-child(${index - 5})`).checked = !grid.querySelector(`.switch:nth-child(${index - 5})`).checked; } // bottom
        if (index % 5 != 0) { grid.querySelector(`.switch:nth-child(${index + 1})`).checked = !grid.querySelector(`.switch:nth-child(${index + 1})`).checked; } // left
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
		document.querySelector('.status').classList.remove('status--offline');
		document.querySelector('.status').classList.add('status--online');
	} else {
		document.querySelector('.status').classList.remove('status--online');
		document.querySelector('.status').classList.add('status--offline');
	}
}

grid.addEventListener('click', toggleSwitches);
grid.addEventListener('click', checkStatus);