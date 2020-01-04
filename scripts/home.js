const setGameInfo = (state) => {
	const gameInfo = document.getElementById('game-info');
	gameInfo.style.display = state ? 'block' : 'none';
};

const setGameContainer = (state) => {
	const gameContainer = document.getElementById('game-container');
	gameContainer.style.display = state ? 'block' : 'none';

	if(state) {
		setGameInfo(true);
	}
	else {
		setGame(false);
	}
};

const setGame = (state) => {
	const game = document.getElementById('game');
	const gameIframe = document.querySelector('#game-container iframe');

	game.style.display = state ? 'block' : '';
	gameIframe.src = state ? 'game.html' : '';

	if(state) {
		setGameInfo(false);

		// Focus iframe when loaded
		gameIframe.onload = () => gameIframe.contentWindow.focus();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const gameButton = document.getElementById('game-button');
	const gameOverlay = document.getElementById('game-overlay');
	const gameButtonClose = document.getElementById('game-close-button');
	const gameButtonPlay = document.getElementById('game-play-button');

	gameButton.onclick = () => setGameContainer(true);
	gameButtonClose.onclick = () => setGameContainer(false);
	gameOverlay.onclick = () => setGameContainer(false);
	gameButtonPlay.onclick = () => setGame(true);
});