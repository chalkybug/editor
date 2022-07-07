var video;
var slider = document.querySelector("#kt_slider_basic");
var duration;
var originEndTime = 0;

// Shorthand for $( document ).ready()
$(function () {
    duration = Math.round(document.getElementById('video-queue-0').duration);
    $('#first-item').attr("value1", 0);
    $('#first-item').attr("value2", duration);

    video = document.getElementById('video-edit');
    addEventlistItem();
    setIONrangeSlider();
    checkDomainAndStop();
});

const drag = new Draggable.Sortable(document.querySelectorAll('ul'), {
    draggable: 'li'
});

//drag.on('drag:start', () => console.log('drag:start'));
//drag.on('drag:move', () => console.log('drag:move'));
//drag.on('drag:stop', () => console.log('drag:stop'));
drag.on('drag:pressure', () => console.log('drag:pressure'));
drag.on('sortable:sorted', () => console.log('sortable:sorted'));

// --------- Handlers for 'Dragged Element' ------------------
function dragstartHandler(evt) {
    evt.dataTransfer.setData("MyDraggedElementId", evt.target.id);
}

// When 'over' you can 'release mouse' to 'drop'.
function dragoverHandler(evt) {
    evt.preventDefault(); // Important!!
}

function dropHandler(evt) {
    evt.preventDefault(); // Important!!

    console.log("dropHandler");
    var elementId = evt.dataTransfer.getData("MyDraggedElementId");
    var node = document.createElement("LI");
    const tabindex = document.getElementsByClassName("lis-group-item draggable").length;
    node.className = 'lis-group-item draggable';
    node.setAttribute("tabindex", tabindex);
    node.setAttribute("value1", 0);
    node.setAttribute("value2", duration);


    var element = document.getElementById(elementId).cloneNode(true);
    element.removeAttribute('class')
    element.setAttribute("id", `video-queue-${tabindex}`);
    node.appendChild(element);

    var panelPlayer = document.getElementById("video-play-0").cloneNode(true);
    panelPlayer.setAttribute("hidden", "hidden");
    panelPlayer.setAttribute("id", `video-play-${tabindex}`);
    document.getElementById("panel-player").appendChild(panelPlayer);

    evt.target.appendChild(node);
    addEventlistItem();
}

function set_start_end_video(video_play) {

    const index = video_play.getAttribute("id");
    const queueVideo = document.getElementById(index.replace("play", "queue")).parentNode;
    const start = queueVideo.getAttribute("value1");
    const end = queueVideo.getAttribute("value2");

    if (video_play.currentTime < start) {
        video_play.currentTime = start;
        console.log("start");
        video_play.pause();
    }
    if (video_play.currentTime > end) {
        video_play.currentTime = end;
        console.log("end");
        video_play.pause();
    }
}

function addEventlistItem() {
    $(".lis-group-item").off('click').click(function () {
        const start = Math.round($(this).attr("value1"));
        const end = Math.round($(this).attr("value2"));
        const index = $(this).find("video").attr("id");
        console.log(index)

        const video_play = document.getElementById(index.replace("queue", "play"));

        $("#panel-player video").attr("hidden", "hidden");
        video_play.removeAttribute("hidden");
        $(this).toggleClass('selected');
        console.log("update timeer")
        video_play.removeEventListener('timeupdate', function () {
            set_start_end_video(video_play);
        }, true);

        video_play.currentTime = start;

        console.log(this.tabIndex);

        $(".lis-group li").removeClass("selected");
        $(this).toggleClass('selected');

        video_play.addEventListener('timeupdate', function () {
            set_start_end_video(video_play);
        });

    });
}

var readValue;
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

/*
 IONrangeSlider
 */
var fromOld = 0;
var toOld = duration;
function setIONrangeSlider() {
    console.log(duration);
    noUiSlider.create(slider, {
        start: [0, duration], // Handle start position
        step: 1, // Slider moves in increments of '1'
        margin: 3, // Handles must be more than '3' apart
        connect: true, // Display a colored bar between the handles
        behaviour: 'tap-drag', // Move handle on tap, bar is draggable
        range: { // Slider can select '0' to 'duration'
            'min': 0,
            'max': duration
        }
    });

    var valueMin = document.querySelector("#kt_slider_basic_min");
    var valueMax = document.querySelector("#kt_slider_basic_max");
    var valueMinHidden = document.querySelector("#kt_slider_basic_min_value");
    var valueMaxHidden = document.querySelector("#kt_slider_basic_max_value");
    var readValue;
    // When the slider value changes, update the input and span
    slider.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            readValue = values[handle] | 0;
            valueMaxHidden.innerHTML = Math.round(values[handle]);
            valueMax.innerHTML = toHHMMSS(values[handle]);

            if (toOld != readValue) {
                toOld = readValue;

            }

        } else {
            readValue = values[handle] | 0;
            valueMinHidden.innerHTML = Math.round(values[handle]);
            valueMin.innerHTML = toHHMMSS(values[handle]);

            if (fromOld != readValue) {
                fromOld = readValue;
                document.getElementById("video-edit").currentTime = readValue;
                //document.getElementById("video-edit").load();
                console.log(readValue);
                //player.seekTo(readValue, true);
                //player.pauseVideo();
                //player.playVideo();
            }
        }
    });

    // When the input changes, set the slider value
    //valueMinHidden.addEventListener('change', function () {
    //    slider.noUiSlider.set([null, this.value]);
    //    console.log(this.value);
    //    $("#video-edit").attr('currentTime', this.value);

    //});
}

$("#trimModal").on('show.bs.modal', function (e) {

    const itemSelected = $('.lis-group-item.draggable.selected');
    const value1 = Math.round(itemSelected.attr("value1"));
    const value2 = Math.round(itemSelected.attr("value2"));
    console.log(value1);
    if (value1 !== '0' || value2 !== '-1') {
        document.getElementById('video-edit').addEventListener('loadedmetadata', function () {
            this.currentTime = value1;
        }, false);
        slider.noUiSlider.set([value1, value2]);
    }
});


function handleSaveTrim() {
    const itemSelected = $('.lis-group-item.draggable.selected');
    var valueMinHidden = document.querySelector("#kt_slider_basic_min_value");
    var valueMaxHidden = document.querySelector("#kt_slider_basic_max_value");
    itemSelected.attr("value1", valueMinHidden.innerHTML);
    itemSelected.attr("value2", valueMaxHidden.innerHTML);
    $("#trimModal").modal('toggle');
    addEventlistItem();
}

function checkDomainAndStop() {

    var curTime = video.currentTime;


    if (curTime > toOld) {
        pauseVideo();
    }

    // recursively call it.
    setTimeout(checkDomainAndStop, 100);
}
function checkAndStop() {

    var curTime = document.getElementById("video-origin")


    if (curTime > toOld) {
        pauseVideo();
    }

    // recursively call it.
    setTimeout(checkDomainAndStop, 100);
}

function pauseVideo() {
    video.pause();
}

function playVideo() {
    video.play();
}
