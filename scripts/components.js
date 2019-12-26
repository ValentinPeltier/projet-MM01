const header = document.createElement('header');
header.innerHTML = `
	<div class="top">
		<img src="assets/images/mario-head.png" class="mario-head" />
		<button id="menu-button">
			<div></div>
			<div></div>
			<div></div>
		</button>

		<a href="index.html" class="logo-link">
			<img src="assets/images/logo.svg" />
		</a>

		<button id="audio-button">
			<i id="audio-icon-play" class="far fa-play-circle audio-icon active"></i>
			<i id="audio-icon-pause" class="far fa-pause-circle audio-icon"></i>
			<audio id="audio">
				<source src="assets/audio/theme.mp3" type="audio/mpeg" />
				<source src="assets/audio/theme.mp3" type="audio/mp3" />
			</audio>
		</button>
	</div>

	<nav>
		<div class="nav-links">
			<div class="link">
				<a href="index.html">Accueil</a>
			</div>
			<div class="link">
				<a href="gameplay.html">Gameplay</a>
			</div>
			<div class="dropdown">
				<a href="">L'univers</a>
				<div class="dropdown-content">
					<a href="mondes.html">Les mondes</a>
					<a href="personnages.html">Les personnages</a>
				</div>
			</div>
			<div class="dropdown">
				<a href="">Histoire du jeu</a>
				<div class="dropdown-content">
					<a href="objectif.html">Objectif du jeu</a>
					<a href="versions.html">Versions</a>
				</div>
			</div>
			<div class="link">
				<a href="quizz.html">Quizz</a>
			</div>
		</div>
	</nav>
`;


const footer = document.createElement('footer');
footer.innerHTML = `
		<img src="assets/images/run.webp" class="mario-run">
		Valentin Peltier - 2019<br>
		<a href="credits.html">Crédits</a> - <a href="contact.html">Contact</a>
`;

document.body.prepend(header);
document.body.append(footer);