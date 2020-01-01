const setGameContainer = (state) => {
	const gameContainer = document.getElementById('game-container');
	const gameIframe = document.querySelector('#game-container iframe');

	gameContainer.style.display = state ? 'block' : 'none';

	if(state) {
		gameIframe.src = 'game.html';
	}
	else {
		gameIframe.src = '';
	}
};

document.addEventListener('DOMContentLoaded', () => {
	const gameButton = document.getElementById('game-button');
	const gameOverlay = document.getElementById('game-overlay');
	const gameButtonClose = document.getElementById('game-close-button');

	gameButton.onclick = () => setGameContainer(true);
	gameButtonClose.onclick = () => setGameContainer(false);
	gameOverlay.onclick = () => setGameContainer(false);
});