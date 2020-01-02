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

const setVideoContainer = (id, state, videoId, start) => {
	const videoContainer = document.getElementById(`video-container-${id}`);

	if(videoContainer) {
		const videoIframe = document.querySelector(`#video-container-${id} iframe`);

		if(state) {
			// Set src if it has not been loaded yet
			const videoSource = `https://www.youtube.com/embed/${videoId}?enablejsapi=1${start ? `&start=${start}` : ''}`;
			if(videoIframe.src !== videoSource) {
				videoIframe.src = videoSource;
			}

			videoContainer.classList.add('active');

			// Handle escape key
			window.addEventListener('keydown', videoKeydownHandler, { passive: true });
		}
		else {
			// Pause the video and hide the container
			videoIframe.contentWindow.postMessage(`{"event":"command","func":"pauseVideo","args":""}`, '*');
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
	const videoButtons = document.querySelectorAll('[data-video]');

	videoButtons.forEach((videoButton, i) => {
		const videoContainer = document.createElement('div');
		videoContainer.id = `video-container-${i}`;
		videoContainer.classList.add('video-container');
		videoContainer.innerHTML = `
			<div class="video-overlay" onclick="setVideoContainer(${i}, false)"></div>

			<div class="video-margin">
				<div class="video-ratio">
					<div class="close-button" title="Fermer" onclick="setVideoContainer(${i}, false)">
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

		videoButton.addEventListener('click', () => setVideoContainer(
			i,
			true,
			videoButton.getAttribute('data-video'),
			videoButton.getAttribute('data-video-start'),
		));

		document.body.appendChild(videoContainer);
	});
});