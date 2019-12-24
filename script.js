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

window.onload = () => {
	// Add event listeners
    const audioButton = document.getElementById('audio-button');
    const menuButton = document.getElementById('menu-button');

    if(audioButton) {
        audioButton.onclick = toggleAudio;
    }
    if(menuButton) {
        menuButton.onclick = toggleMenu;
    }

    // Prevent from clicking on dropdown links in navbar
    document.querySelectorAll('.nav-links > .dropdown > a[href=""]').forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
	});
};