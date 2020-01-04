// From https://emailregex.com/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const prepareEmail = () => {
	const nl = '%0D%0A';
	let error = null;
	const formError = document.getElementById('form-error');

	const firstname = document.querySelector('input[name="firstname"]').value;
	const lastname = document.querySelector('input[name="lastname"]').value;
	const email = document.querySelector('input[name="email"]').value;
	let subject = document.querySelector('input[name="subject"]').value;
	let message = document.querySelector('textarea[name="message"]').value;

	// Test blank fields
	if(!firstname.trim() || !lastname.trim() || !email.trim() || !subject.trim() || !message.trim()) {
		error = 'Veuillez remplir tous les champs.';
	}
	// Test email
	else if(!emailRegex.test(email)) {
		error = 'Veuillez fournir une adresse email valide.';
	}

	if(error) {
		formError.innerText = error;
		return;
	}

	formError.innerText = '';

	const from = `De : ${firstname} ${lastname} (${email})`;
	subject = `[New Super Mario Bros.] ${subject}`;

	// Replace line breaks by ascii hexadecimal code
	// to be correctly interpreted
	message = message.replace(/\r?\n/g, nl);

	window.open(`mailto:Mahé%CHAON<mahe.chaon@utt.fr>?subject=${subject}&body=${from}${nl}${nl}${message}`);
};

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementsByTagName('form')[0];

	form.onsubmit = () => {
		prepareEmail();
		return false;
	}
});