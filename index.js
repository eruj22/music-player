// media controllers
const playPauseBtn = document.getElementById('playpause-btn');
const backwardsBtn = document.getElementById('prev-btn');
const forwardBtn = document.getElementById('forward-btn');
const currentTime = document.getElementById('current-time-text');
const totalDuration = document.getElementById('duration-time-text');
const songSlider = document.getElementById('time-slider');

// playing song
const songName = document.getElementById('playlist-name');
const songArtist = document.getElementById('playlist-artist');
// const audio = document.getElementById('audio'); // audio file
const coverArt = document.getElementById('cover');

// menu
const menuToggle = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');


let audio = document.createElement('audio');

const songList = [
    {
        name: "A Kind of Magic",
        artist: "Queens",
        source: "assets/music/A Kind Of Magic.mp3",
        cover: "assets/cover/best-of-queen.jpg"
    },
    {
        name: "Another One Bites The Dust",
        artist: "Queens",
        source: "assets/music/Another One Bites The Dust.mp3",
        cover: "assets/cover/best-of-queen.jpg"
    },
    {
        name: "Bohemian Rhapsody",
        artist: "Queens",
        source: "assets/music/Bohemian Rhapsody.mp3",
        cover: "assets/cover/best-of-queen.jpg"
    },
    {
        name: "Under Pressure",
        artist: "Queens",
        source: "assets/music/Under Pressure.mp3",
        cover: "assets/cover/best-of-queen.jpg"
    }
];

// specify globally used values
let songIndex = 0;
let isPlaying = false;
let updateTimer;

// working buttons
forwardBtn.addEventListener('click', () => {
    nextSong();
});

backwardsBtn.addEventListener('click', () => {
    previousSong();
});

playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

songSlider.addEventListener('change', seekTo);

loadSong(songIndex);

function loadSong(song) {
    // insert reset values
    resetValues();

    audio.src = songList[song].source;
    audio.load();

    updateTimer = setInterval(seekUpdate, 1000);

    // update details of the track
    coverArt.src = songList[song].cover;
    songName.innerText = songList[song].name;
    songArtist.innerText = songList[song].artist;

    audio.addEventListener('ended', nextSong);
}

function resetValues() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    songSlider.value = 0;
}

function nextSong() {
    if (songIndex < songList.length - 1) {
        songIndex += 1;
    } else {
        songIndex = 0;
    }

    // load and play new song
    loadSong(songIndex);
    playSong();
}

function previousSong() {
    if (songIndex > 0) {
        songIndex -= 1;
    } else {
        songIndex = songList.length;
    }

    loadSong(songIndex);
    playSong();
}

function playSong() {
    audio.play();
    isPlaying = true;

    playPauseBtn.classList.add('playing');
}

function pauseSong() {
    audio.pause();
    isPlaying = false;

    playPauseBtn.classList.remove('playing');
}

// track slider
function seekTo() {
    seek = audio.duration * (songSlider.value / 100);

    audio.currentTime = seek;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(audio.duration)) {
        seekPosition = audio.currentTime * (100 / audio.duration);
        songSlider.value = seekPosition;
    
        // calculations
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let totalMinutes = Math.floor(audio.duration / 60);
        let totalSeconds = Math.floor(audio.duration - totalMinutes * 60);
    
        // add a 0 to single digits
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (totalMinutes < 10) { totalMinutes = "0" + totalMinutes; }
        if (totalSeconds < 10) { totalSeconds = "0" + totalSeconds; }
    
        // display time
        currentTime.innerText = currentMinutes + ":" + currentSeconds;
        totalDuration.innerText = totalMinutes + ":" + totalSeconds;
    }
}

// toggle menu
let menuOpen = false;
menuToggle.addEventListener('click', () => {
    if (menuOpen === false) {
        menu.style.display = 'block';
        menuOpen = true;
    } else {
        menu.style.display = 'none';
        menuOpen = false;
    }
});

