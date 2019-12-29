const quizzEntries = [
	{
		question: 'Question 1',
		answers: [
			'Réponse 1.1',
			'Réponse 1.2',
			'Réponse 1.3',
		],
		correct: 2,
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
		correct: 0,
	},
];

var quizzState = {
	page: 0,
	answers: [],
};

const changePage = (pageShift) => {
	if(quizzState.page + pageShift < 0 || quizzState.page + pageShift >= quizzEntries.length) {
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
	page.innerText = `Question ${quizzState.page + 1} / ${quizzEntries.length}`;
	buttonPrevious.style.display = quizzState.page === 0 ? 'none' : 'inline-block';
	buttonNext.style.display = quizzState.page + 1 === quizzEntries.length ? 'none' : 'inline-block';
	buttonSend.style.display = quizzState.page + 1 === quizzEntries.length ? 'inline-block' : 'none';

	// Go to requested question
	questions.style.left = `-${quizzState.page * 100}%`;

	// Update question container height
	const questionHeight = document.querySelectorAll('#quizz-questions .question')[quizzState.page].scrollHeight;
	questionsContainer.style.height = `${questionHeight}px`;
};

const setAnswer = (entryIndex, answerIndex) => {
	quizzState.answers[entryIndex] = answerIndex;
};

const checkAnswers = () => {
	const resultImage = document.getElementById('quizz-result-image');
	const result = document.getElementById('quizz-result');

	let image = null;
	let score = quizzEntries.reduce((previous, current, entryIndex) => {
		const answer = quizzState.answers.find((e, i) => i === entryIndex);
		return previous + (answer === current.correct ? 1 : 0);
	}, 0);
	score = Math.round(score / quizzEntries.length * 100);

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
	result.innerText = `Vous avez ${score}% de bonnes réponses. ${comment}`;

	// Show correct answers
	quizzEntries.forEach((entry, i) => {
		const answer = document.querySelector(`input[name="question${i}"][value="${entry.correct}"] + div + span`);
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

document.addEventListener('DOMContentLoaded', () => {
	const buttonPrevious = document.getElementById('quizz-button-previous');
	const buttonNext = document.getElementById('quizz-button-next');
	const buttonSend = document.getElementById('quizz-button-send');
	const buttonReset = document.getElementById('quizz-button-reset');
	const questions = document.getElementById('quizz-questions');

	quizzEntries.forEach((entry, entryIndex) => {
		const answers = entry.answers.reduce((previous, current, answerIndex) => (
			previous + `
				<label>
					<input
						type="radio"
						value="${answerIndex}"
						name="question${entryIndex}"
						onclick="setAnswer(${entryIndex}, ${answerIndex})"
					/>
					<div class="radio-placeholder"></div>
					<span>${current}</span>
				</label>
			`
		), '');

		questions.innerHTML += `
			<div class="question" style="left: ${entryIndex * 100}%">
				<h2>${entry.question}</h2>
				${answers}
			</div>
		`;
	});

	buttonPrevious.onclick = () => changePage(-1);
	buttonNext.onclick = () => changePage(1);
	buttonSend.onclick = checkAnswers;
	buttonReset.onclick = resetQuizz;

	updatePage();
});