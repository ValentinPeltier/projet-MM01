const entriesCount = 5; // Choose the number of questions in the quizz

const quizzEntries = [
	{
		question: 'Dans New Super Mario Bros. Wii, que se passe-t-il lorsqu\'on a 99 vies ?',
		answers: [
			'La voix de Mario change',
			'Mario perd sa casquette',
			'Un passage vers le monde 9 apparaît',
			'Il ne se passe rien',
		],
		correct: 1,
		link: 'https://youtu.be/6SnHtjfi2f4?t=2792',
	},
	{
		question: 'Dans New Super Mario Bros. Wii, que peut faire Toad rouge ?',
		answers: [
			'Servir de projectile',
			'Lancer des boules de feu',
			'Se faire contrôler par le joueur',
			'Se faire porter',
		],
		correct: 3,
		link: 'https://youtu.be/6SnHtjfi2f4?t=2659',
	},
	{
		question: 'En quelle année Mario est-il apparu pour la première fois ?',
		answers: [
			'1980',
			'1981',
			'1985',
			'1989',
		],
		correct: 1,
		link: 'personnages.html',
	},
	{
		question: 'Quel est le lien de parenté entre Luigi et Mario ?',
		answers: [
			'Luigi est le grand frère de Mario',
			'Luigi est le petit frère de Mario',
			'Ils n\'ont pas de lien de parenté',
		],
		correct: 1,
		link: 'https://en.wikipedia.org/wiki/Luigi#Characteristics',
	},
	{
		question: 'Quel est le prénom de la première copine de Mario ?',
		answers: [
			'Daisy',
			'Peach',
			'Pauline',
			'Rosy',
			'Sunny',
		],
		correct: 2,
		link: 'https://fr.wikipedia.org/wiki/Personnages_de_Mario#Pauline',
	},
	{
		question: 'Comment s\'appelle le dinosaure vert ?',
		answers: [
			'Bowser',
			'Toad',
			'Goomba',
			'Yoshi',
		],
		correct: 3,
		link: 'personnages.html',
	},
	{
		question: 'Comment s\'appelle le personnage qui a un champignon sur la tête ?',
		answers: [
			'Koopa',
			'Topi Taupe',
			'Toad',
		],
		correct: 2,
		link: 'personnages.html',
	},
	{
		question: 'Mario a inventé par...',
		answers: [
			'Sega',
			'Ubisoft',
			'EA',
			'Aucun des trois'
		],
		correct: 3,
		link: 'https://fr.wikipedia.org/wiki/Mario_(personnage)',
	},
	{
		question: 'Comment faut-il faire pour accéder aux mondes 4 et 7 ?',
		answers: [
			'En devenant géant',
			'En empruntant un passage secret',
			'En devant petit',
		],
		correct: 2,
		link: 'https://youtu.be/aJfq3b1uFB8?t=279',
	},
	{
		question: 'Quels personnages sont jouables ?',
		answers: [
			'Mario, Luigi, Toad, Yoshi',
			'Mario, Luigi, Wario, Yoshi',
			'Mario, Luigi, Wario, Waluigi',
		],
		correct: 0,
	},
	{
		question: 'New Super Mario Bros. a reçu de très bonnes critiques.',
		answers: [
			'Vrai',
			'Faux',
		],
		correct: 0,
		link: 'https://fr.wikipedia.org/wiki/New_Super_Mario_Bros.#Critiques',
	},
];

var quizzState = {
	page: 0,
	answers: [],
};

var currentEntries = [];

const changePage = (pageShift) => {
	if(quizzState.page + pageShift < 0 || quizzState.page + pageShift >= entriesCount) {
		return;
	}

	quizzState.page += pageShift;
	updatePage();
}

const updatePage = () => {
	const page = document.getElementById('quizz-page');
	const buttonPrevious = document.getElementById('quizz-button-previous');
	const buttonNext = document.getElementById('quizz-button-next');
	const buttonSend = document.getElementById('quizz-button-send');
	const questions = document.getElementById('quizz-questions');
	const questionsContainer = document.getElementById('quizz-questions-container');

	// Update footer
	page.innerText = `Question ${quizzState.page + 1} / ${entriesCount}`;
	buttonPrevious.style.display = quizzState.page === 0 ? 'none' : 'inline-block';
	buttonNext.style.display = quizzState.page + 1 === entriesCount ? 'none' : 'inline-block';
	buttonSend.style.display = quizzState.page + 1 === entriesCount ? 'inline-block' : 'none';

	// Go to requested question
	questions.style.left = `-${quizzState.page * 100}%`;

	// Update question container height
	const entryId = currentEntries[quizzState.page].id;
	const questionHeight = document.querySelector(`#quizz-questions #question${entryId}`).scrollHeight;
	questionsContainer.style.height = `${questionHeight}px`;
};

const setAnswer = (entryIndex, answerIndex) => {
	quizzState.answers[entryIndex] = answerIndex;
};

const checkAnswers = () => {
	const resultImage = document.getElementById('quizz-result-image');
	const result = document.getElementById('quizz-result');

	let image = null;
	let score = currentEntries.reduce((previous, current, entryIndex) => {
		const answer = quizzState.answers.find((e, i) => i === entryIndex);
		return previous + (answer === current.correct ? 1 : 0);
	}, 0);
	score = Math.round(score / entriesCount * 100);

	if(score > 90) {
		comment = 'Félicitations !';
		image = '90.png';
	}
	else if(score > 70) {
		comment = 'Bien joué.';
		image = '70.png';
	}
	else if(score > 50) {
		comment = 'Pas trop mal.';
		image = '50.png';
	}
	else if(score > 30) {
		comment = 'Vous pouvez mieux faire...';
		image = '30.png';
	}
	else {
		comment = 'Vous avez déjà joué au jeu ?';
		image = '0.png';
	}

	resultImage.src = `assets/images/quizz/${image}`;
	result.innerHTML = `Vous avez ${score}% de bonnes réponses.<br />${comment}`;

	currentEntries.forEach((entry) => {
		// Show correct answers
		const answer = document.querySelector(`input[name="question${entry.id}"][value="${entry.correct}"] + div + span`);
		answer.classList.add('correct-answer');

		// Show links
		const link = document.querySelector(`#question${entry.id} .question-link`);
		if(link) {
			link.style.display = 'inline-block';
		}
	});

	// Display result container
	document.getElementById('quizz-result-container').style.display = 'block';

	// Go to page 1
	quizzState.page = 0;
	updatePage();
};

const resetQuizz = () => {
	// Reset state
	quizzState.page = 0;
	quizzState.answers = [];
	generateEntries();
	updatePage();

	// Reset correct answers
	document.querySelectorAll('input[name^="question"] + div + span').forEach((answer) => {
		answer.classList.remove('correct-answer');
	});

	// Reset radio inputs
	document.querySelectorAll('input[name^="question"]').forEach((radioInput) => {
		radioInput.checked = false;
	});

	// Reset result
	document.getElementById('quizz-result-image').src = '';
	document.getElementById('quizz-result').innerText = '';

	// Hide result container
	document.getElementById('quizz-result-container').style.display = null;

}

const generateEntries = () => {
	currentEntries = [];
	const usedIndexes = [];

	for(let i = 0; i < entriesCount; i++) {
		// Generate a random integer between 0 and quizzEntries.length (excluded)
		let randomIndex = null;
		do {
			randomIndex = Math.floor(Math.random() * quizzEntries.length);
		} while(usedIndexes.includes(randomIndex));

		currentEntries.push({
			id: randomIndex,
			...quizzEntries[randomIndex],
		});

		// Store the index to not re-use it
		usedIndexes.push(randomIndex);
	}

	// Update DOM
	const questions = document.getElementById('quizz-questions');
	questions.innerHTML = '';

	currentEntries.forEach((entry, entryIndex) => {
		const answers = entry.answers.reduce((previous, current, answerIndex) => (
			previous + `
				<label>
					<input
						type="radio"
						value="${answerIndex}"
						name="question${entry.id}"
						onclick="setAnswer(${entryIndex}, ${answerIndex})"
					/>
					<div class="radio-placeholder"></div>
					<span>${current}</span>
				</label>
			`
		), '');

		questions.innerHTML += `
			<div id="question${entry.id}" class="question" style="left: ${entryIndex * 100}%">
				<h2>${entry.question}</h2>
				${answers}
				${entry.link ? `
					<div class="question-link" style="display: none">
						<i class="fas fa-angle-right"></i>
						<a
							class="link"
							href="${entry.link}"
							target="_blank"
							rel="noopener noreferrer"
						>
							Pour plus d'informations, cliquez ici.
						</a>
					</div>
				` : ''}
			</div>
		`;
	});
};

document.addEventListener('DOMContentLoaded', () => {
	const buttonPrevious = document.getElementById('quizz-button-previous');
	const buttonNext = document.getElementById('quizz-button-next');
	const buttonSend = document.getElementById('quizz-button-send');
	const buttonReset = document.getElementById('quizz-button-reset');

	generateEntries();
	updatePage();

	buttonPrevious.onclick = () => changePage(-1);
	buttonNext.onclick = () => changePage(1);
	buttonSend.onclick = checkAnswers;
	buttonReset.onclick = resetQuizz;
});