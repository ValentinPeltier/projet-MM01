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
	const videoButton = document.querySelector('#home .video-button');
	const videoOverlay = document.querySelector('#home .video-overlay');
	const videoCloseButton = document.querySelector('#home .video-container .close-button');

	if(videoButton) {
		videoButton.onclick = () => setVideoContainer(false, true);
	}
	if(videoOverlay) {
		videoOverlay.onclick = () => setVideoContainer(true);
	}
	if(videoCloseButton) {
		videoCloseButton.onclick = () => setVideoContainer(false, false);
	}
});