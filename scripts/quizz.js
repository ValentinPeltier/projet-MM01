const entriesCount = 3; // Choose the number of questions in the quizz

const quizzEntries = [
	{
		question: 'Question 1',
		answers: [
			'Réponse 1.1',
			'Réponse 1.2',
			'Réponse 1.3',
		],
		correct: 0,
	},
	{
		question: 'Question 2',
		answers: [
			'Réponse 2.1',
			'Réponse 2.2',
		],
		correct: 1,
	},
	{
		question: 'Question 3',
		answers: [
			'Réponse 3.1',
			'Réponse 3.2',
			'Réponse 3.3',
			'Réponse 3.4',
			'Réponse 3.5',
		],
		correct: 2,
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

	// Show correct answers
	currentEntries.forEach((entry) => {
		const answer = document.querySelector(`input[name="question${entry.id}"][value="${entry.correct}"] + div + span`);
		answer.classList.add('correct-answer');
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
		// Generate a random integer between 0 and entriesCount (excluded)
		let randomIndex = null;
		do {
			randomIndex = Math.floor(Math.random() * entriesCount);
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