console.log("If the folder contains something that isn't an mp3 file this site will fail");

const folderInput = document.getElementById("folderInput");
folderInput.addEventListener("change", () => {
    document.body.style.backgroundColor = "#1E242E";
    const folderSelectButton = document.getElementById("folderSelectButton");
    folderSelectButton.classList.add("hidden");
    const controls = document.getElementById("controls");
    controls.classList.remove("hidden");

    const files = folderInput.files;
    window.files = folderInput.files;
    const filesLength = files.length;
    window.filesLength = filesLength;
    
    for(let i = 0; i < filesLength; i++) {
        const songName = files[i].name.substring(0, files[i].name.indexOf("."));
        console.log("Song is: " + songName);

        const songButton = document.createElement("div");
        songButton.id = i;
        songButton.classList.add("songButton");
        songButton.innerHTML = songName;
        songButton.addEventListener("click", () => {
            if(window.currentSong !== undefined) {
                const previousSongButton = document.getElementById(window.currentSong.toString());
                previousSongButton.classList.remove("glowingButton");
            }

            window.counter = parseInt(songButton.id);
            window.currentSong = window.counter;
            songButton.classList.add("glowingButton");

            const player = document.getElementById("player");
            player.src = URL.createObjectURL(files[window.counter]);//.webkitRelativePath;
            player.autoplay = true;

            const songTitle = document.getElementById("songTitle");
            songTitle.innerHTML = window.files[window.counter].name;
        });
        document.getElementById("app").appendChild(songButton);

        //this will change the song everytime it ends
        if(i === 0) {
            window.counter = 0;

            window.currentSong = window.counter;
            songButton.classList.add("glowingButton");

            const player = document.getElementById("player");
            player.src = URL.createObjectURL(files[window.counter]);
            player.autoplay = true;

            const songTitle = document.getElementById("songTitle");
            songTitle.innerHTML = window.files[window.counter].name;
        }
    }

    const player = document.getElementById("player");
    player.addEventListener("ended", () => {
        //console.log("SONG ENDED");
        if(window.counter < window.filesLength-1) {
            if(window.currentSong !== undefined) {
                const previousSongButton = document.getElementById(window.currentSong.toString());
                previousSongButton.classList.remove("glowingButton");
            }

            window.counter++;
            window.currentSong = window.counter;
            const currentSongButton = document.getElementById(window.currentSong.toString());
            currentSongButton.classList.add("glowingButton");

            player.src = URL.createObjectURL(files[window.counter]);
            player.autoplay = true;

            const songTitle = document.getElementById("songTitle");
            songTitle.innerHTML = window.files[window.counter].name;
        }
    });
    player.addEventListener("loadedmetadata", () => {
        //Set endtime element
        const endTime = document.getElementById("endTime");
        const audioDuration = parseInt(player.duration);
        endTime.innerHTML = secondsToMinutes(audioDuration);

        const timeSlider = document.getElementById("slider");
        timeSlider.max = audioDuration;

        timeSlider.addEventListener("input",  () => {
            player.currentTime = timeSlider.value;

            const currentTime = document.getElementById("currentTime");
            currentTime.innerHTML = secondsToMinutes(timeSlider.value);
        });
    });
    player.addEventListener("timeupdate", () => {
        const currentTime = document.getElementById("currentTime");
        currentTime.innerHTML = secondsToMinutes(player.currentTime);

        const timeSlider = document.getElementById("slider");
        timeSlider.value = player.currentTime;
    });
});

window.setInterval(() => {
    const player = document.getElementById("player");
    const playAndPauseButton = document.getElementById("playAndPauseButton");
    const volumeButton = document.getElementById("volumeButton");
    if(player.paused) {
        playAndPauseButton.src = "img/PlayButton.png";
        playAndPauseButton.addEventListener("click", () => {
            player.play();
        });
    } else {
        playAndPauseButton.src = "img/PauseButton.png";
        playAndPauseButton.addEventListener("click", () => {
            player.pause();
        });
    }

    if(player.muted !== true) {
        volumeButton.src = "img/VolumeOn.png";
        volumeButton.addEventListener("click", () => {
            player.muted = true;
        });
    } else {
        volumeButton.src = "img/VolumeOff.png";
        volumeButton.addEventListener("click", () => {
            player.muted = false;
        });
    }
}, 100);

const goToPreviousSongButton = document.getElementById("goToPreviousSongButton");
goToPreviousSongButton.addEventListener("click", () => {
    if(window.currentSong === 0) {
        const previousSongButton = document.getElementById(window.currentSong.toString());
        previousSongButton.classList.remove("glowingButton");

        window.currentSong = window.filesLength - 1;
        window.counter = window.currentSong;

        const songButton = document.getElementById(window.currentSong.toString());
        songButton.classList.add("glowingButton");

        const player = document.getElementById("player");
        player.src = URL.createObjectURL(files[window.counter]);
        player.autoplay = true;

        const songTitle = document.getElementById("songTitle");
        songTitle.innerHTML = window.files[window.counter].name;
    } else {
        const previousSongButton = document.getElementById(window.currentSong.toString());
        previousSongButton.classList.remove("glowingButton");

        window.currentSong = window.currentSong - 1;
        window.counter = window.currentSong;

        const songButton = document.getElementById(window.currentSong.toString());
        songButton.classList.add("glowingButton");

        const player = document.getElementById("player");
        player.src = URL.createObjectURL(files[window.counter]);
        player.autoplay = true;

        const songTitle = document.getElementById("songTitle");
        songTitle.innerHTML = window.files[window.counter].name;
    }
});

const goToNextSongButton = document.getElementById("goToNextSongButton");
goToNextSongButton.addEventListener("click", () => {
    if(window.currentSong === window.filesLength - 1) {
        const previousSongButton = document.getElementById(window.currentSong.toString());
        previousSongButton.classList.remove("glowingButton");

        window.currentSong = 0;
        window.counter = window.currentSong;

        const songButton = document.getElementById(window.currentSong.toString());
        songButton.classList.add("glowingButton");

        const player = document.getElementById("player");
        player.src = URL.createObjectURL(files[window.counter]);
        player.autoplay = true;

        const songTitle = document.getElementById("songTitle");
        songTitle.innerHTML = window.files[window.counter].name;
    } else {
        const previousSongButton = document.getElementById(window.currentSong.toString());
        previousSongButton.classList.remove("glowingButton");

        window.currentSong = window.currentSong + 1;
        window.counter = window.currentSong;

        const songButton = document.getElementById(window.currentSong.toString());
        songButton.classList.add("glowingButton");

        const player = document.getElementById("player");
        player.src = URL.createObjectURL(files[window.counter]);
        player.autoplay = true;

        const songTitle = document.getElementById("songTitle");
        songTitle.innerHTML = window.files[window.counter].name;
    }
});

//audio.duration gives the duration of the song in seconds

function minutesToSeconds(minuteString) {
    const minutes = parseInt( minuteString.substring(0, minuteString.indexOf(":")) );
    const seconds = parseInt( minuteString.substring(minuteString.indexOf(":") - 1) );
    return (minutes * 60) + seconds;
}

function secondsToMinutes(seconds) {
    if(seconds % 60 === 0) {
        return seconds / 60 + ":" + "00";
    } else {
        let remainder = parseInt(seconds % 60);
        if(remainder < 10) {
            remainder = "0" + remainder;
        }
        const minutes = parseInt(seconds / 60);
        return minutes + ":" + remainder;
    }
}