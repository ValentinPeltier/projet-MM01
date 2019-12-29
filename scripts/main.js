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

const setVideoContainer = (toggle, state) => {
	const videoContainer = document.querySelector('#home .video-container');

	if(videoContainer) {
		if(toggle) {
			videoContainer.classList.toggle('active');
		}
		else if(state) {
			videoContainer.classList.add('active');
		}
		else {
			videoContainer.classList.remove('active');
		}
	}
};

document.addEventListener('DOMContentLoaded', () => {
	// Add event listeners
    const audioButton = document.getElementById('audio-button');
    const menuButton = document.getElementById('menu-button');
	const videoButton = document.querySelector('#home .video-button');
	const videoOverlay = document.querySelector('#home .video-overlay');
	const videoCloseButton = document.querySelector('#home .video-container .close-button');

    if(audioButton) {
        audioButton.onclick = toggleAudio;
    }
    if(menuButton) {
        menuButton.onclick = toggleMenu;
	}
	if(videoButton) {
		videoButton.onclick = () => setVideoContainer(false, true);
	}
	if(videoOverlay) {
		videoOverlay.onclick = () => setVideoContainer(true);
	}
	if(videoCloseButton) {
		videoCloseButton.onclick = () => setVideoContainer(false, false);
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
});