
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var duration;
function onYouTubeIframeAPIReady() {
    console.log(YT)
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'I4sQLMw8gHY',
        playerVars: { 'start': 0, 'autoplay': 0, 'controls': 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onytplayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // event.target.playVideo();

    duration = player.getDuration();
    playPauseVideo();
    setIONrangeSlider();
    checkDomainAndStop();
}

function onytplayerStateChange(newState) {
    setCorrectImageOnPlay();
}

/*
 IONrangeSlider
 */
var fromOld = 0;
var toOld = duration;
var slider;
function setIONrangeSlider() {

    var slider = document.getElementById('range');

    noUiSlider.create(slider, {
        start: [40, duration], // Handle start position
        step: 1, // Slider moves in increments of '1'
        margin: 3, // Handles must be more than '3' apart
        connect: true, // Display a colored bar between the handles
        behaviour: 'tap-drag', // Move handle on tap, bar is draggable
        range: { // Slider can select '0' to 'duration'
            'min': 0,
            'max': duration
        }
    });

    var valueInput = document.getElementById('value-input'),
        valueSpan = document.getElementById('value-span');
    var readValue;
    // When the slider value changes, update the input and span
    slider.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            readValue = values[handle] | 0;
            valueSpan.innerHTML = toHHMMSS(values[handle]);

            if (toOld != readValue) {
                toOld = readValue;
            }

        } else {
            readValue = values[handle] | 0;
            valueInput.innerHTML = toHHMMSS(values[handle]);

            if (fromOld != readValue) {
                fromOld = readValue;
                player.seekTo(readValue, true);
                player.pauseVideo();
                player.playVideo();
            }
        }
    });

    // When the input changes, set the slider value
    valueInput.addEventListener('change', function () {
        slider.noUiSlider.set([null, this.value]);
    });
}

/*
 Player Bar
 */
function updatePlayerBar() {
    var curTime = player.getCurrentTime();

    var cutLeft = fromOld * 100 / duration;
    var cutRigth = (duration - toOld) * 100 / duration;

    var played = (curTime - fromOld) * 100 / duration;

    var toPlay = 100 - played - cutLeft - cutRigth;


    document.getElementById("cut-left").style.width = cutLeft + "%";
    document.getElementById("cut-right").style.width = cutRigth + "%";
    document.getElementById("played").style.width = played + "%";
    document.getElementById("toPlay").style.width = toPlay + "%";
}

function checkDomainAndStop() {

    var curTime = player.getCurrentTime();
    document.getElementById('curTime').innerHTML = toHHMMSS(curTime.toString()) + " / " + toHHMMSS(duration.toString());
    var result = toHHMMSS((toOld - fromOld).toString());
    if (result != "NaN:NaN:NaN") {
        document.getElementById('finalDuration').innerHTML = result;
    }
    if (curTime < fromOld) {
        player.seekTo(fromOld, true);
    }
    if (curTime > toOld) {
        player.seekTo(toOld, true);
        pauseVideo();
    }

    updatePlayerBar();

    // recursively call it.
    setTimeout(checkDomainAndStop, 100);
}

/*
 converts String to hh:mm:ss or mm:ss
 */
function toHHMMSS(val) {
    var sec_num = parseInt(val, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    // only mm:ss
    if (hours == "00") {
        var time = minutes + ':' + seconds;
    }
    else {
        var time = hours + ':' + minutes + ':' + seconds;
    }

    return time;
}

function stopVideo() {
    player.stopVideo();

}
function pauseVideo() {
    player.pauseVideo();
}

function playVideo() {
    player.playVideo();
}

function playPauseVideo() {
    //is playing
    if (player.getPlayerState() == 1) {
        pauseVideo();
    }
    else {
        playVideo();
    }
}

function setCorrectImageOnPlay() {
    //is playing
    if (player.getPlayerState() == 1) {
        document.getElementById('playPause').innerHTML =
            "<i class=\"separa fa fa-pause fa-2x\"></i>";
    }
    else {
        document.getElementById('playPause').innerHTML =
            "<i class=\"separa fa fa-play fa-2x\"></i>";
    }
}

function backwardVideo() {
    var curTime = player.getCurrentTime();
    curTime -= 5;
    if (curTime < fromOld) {
        player.seekTo(fromOld, true);
    }
    else {
        player.seekTo(curTime, true);
    }
}

function rewindVideo() {
    player.seekTo(fromOld, true);
    playVideo();
}


function forwardVideo() {
    var curTime = player.getCurrentTime();

    curTime += 5;
    if (curTime > toOld) {
        player.seekTo(toOld, true);
    }
    else {
        player.seekTo(curTime, true);
    }
}
