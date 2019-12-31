const toggleAudio = () => {
    const audio = document.getElementById('audio');
    const playIcon = document.getElementById('audio-icon-play');
    const pauseIcon = document.getElementById('audio-icon-pause');

    if(audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
    }

    playIcon.classList.toggle('active');
    pauseIcon.classList.toggle('active');
};

const toggleMenu = () => {
    const header = document.getElementsByTagName('header')[0];

    if(header) {
        header.classList.toggle('active');
    }
};

const videoKeydownHandler = (event) => {
	if(event.code === 'Escape') {
		setVideoContainer(false);
	}
};

const setVideoContainer = (state, videoId) => {
	const videoContainer = document.getElementById('video-container');

	if(videoContainer) {
		if(state) {
			document.querySelector('#video-container iframe').src = `https://www.youtube.com/embed/${videoId}`;
			videoContainer.classList.add('active');

			// Handle escape key
			window.addEventListener('keydown', videoKeydownHandler, { passive: true });
		}
		else {
			document.querySelector('#video-container iframe').src = '';
			videoContainer.classList.remove('active');
			window.removeEventListener('keydown', videoKeydownHandler, { passive: true });
		}
	}
};

document.addEventListener('DOMContentLoaded', () => {
	// Add event listeners on navbar
    const audioButton = document.getElementById('audio-button');
	const menuButton = document.getElementById('menu-button');

    if(audioButton) {
        audioButton.onclick = toggleAudio;
    }
    if(menuButton) {
        menuButton.onclick = toggleMenu;
	}

    // Prevent from clicking on dropdown links in navbar
    document.querySelectorAll('.nav-links .dropdown > a[href=""]').forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
	});

	// Improve accessibility
	document.querySelectorAll('.nav-links .dropdown-content > a').forEach((link) => {
        link.addEventListener("focusin", () => {
            link.parentNode.classList.add('active');
		});
		link.addEventListener("focusout", () => {
            link.parentNode.classList.remove('active');
        });
	});

	// Create video container if needed
	const videoButtons = document.querySelectorAll('.video-button');

	if(videoButtons.length) {
		const videoContainer = document.createElement('div');
		videoContainer.id = 'video-container';
		videoContainer.innerHTML = `
			<div class="video-overlay" onclick="setVideoContainer(false)"></div>

			<div class="video-margin">
				<div class="video-ratio">
					<div class="close-button" title="Fermer" onclick="setVideoContainer(false)">
						<i class="fas fa-times"></i>
					</div>

					<iframe
						src=""
						frameborder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		`;

		const main = document.getElementsByTagName('main')[0];
		main.parentNode.insertBefore(videoContainer, main.nextSibling);
	}

	videoButtons.forEach((videoButton) => {
		videoButton.onclick = () => setVideoContainer(true, videoButton.getAttribute('data-video'));
	});
});