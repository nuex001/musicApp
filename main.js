const listCont = document.querySelector(".lists")
const musisListBtn = document.querySelector("#musisListBtn");
const prev_btn = document.querySelector("#prev");
const play_btn = document.querySelector("#play");
const next_btn = document.querySelector("#next");
const progress_bar = document.querySelector(".progress_bar");
const proggression = document.querySelector(".proggression");
const audio = document.querySelector("audio");
const controls = document.querySelector(".controls");
const icon = document.querySelector("#icon")
const display = document.querySelector(".display img")
const rows = document.querySelectorAll(".row")
const removeBtns = document.querySelectorAll("#removeBtn")

const songName = document.querySelector(".songName")
const artist = document.querySelector(".artist")
const duration = document.querySelector(".duration")
const currentTime = document.querySelector(".currentTime")

const songArry = [
    { name: "a.sinach", artist: "Sinach", song: "a.sinach.mp3", image: "a.sinach.jpg" },
    { name: "Abochi-Bestie", artist: "Abochi", song: "Abochi-Bestie.mp3", image: "Abochi-Bestie.jpg" },
    { name: "Bella_Shmurda_ft_Drey_Spencer", artist: "Bella_Shmurda", song: "Bella_Shmurda_ft_Drey_Spencer.mp3", image: "Bella_Shmurda_ft_Drey_Spencer.jpg" },
    { name: "Bulie-preye_odede", artist: "bulie-preye", song: "bulie-preye_odede.mp3", image: "bulie-preye_odede.jpg" },
    { name: "Chike_-_Watching_over", artist: "Chike", song: "Chike_-_Watching_over.mp3", image: "Chike_-_Watching_over.jpg" },
    { name: "Chike_-Forgive", artist: "Chike", song: "Chike_-Forgive.jpg.mp3", image: "Chike_-_Watching_over.jpg" },
    { name: "Godzilla", artist: "Eminem", song: "Godzilla.mp3", image: "Godzilla.jpg" },
    { name: "Justin Bieber - Intentions", artist: "Justin", song: "a.sinach.mp3", image: "Justin Bieber - Intentions.jpg" },
    { name: "Stainless", artist: "Simi", song: "Stainless.mp3", image: "Stainless.jpg" },
]


let currentIdx;



/**
 * @SETS_CURRENT_TIME
 */
const setCurrentTimeStamp = (time) => {
    totalMin = Math.floor(time / 60); //get total mins
    totalSec = Math.floor(time % 60); //get sec
    if (totalSec < 10) { //check if sec is lesser than 10,then append 0 to it
        totalSec = `0${totalSec}`;
    }
    currentTime.textContent = `${totalMin}:${totalSec}`;
}

/**
 * @SETS_AUDIO_DURATION
 */

const setDuration = () => {
    audio.addEventListener("loadeddata", () => {
        // update song duration time total
        let audioDuration = audio.duration;
        totalMin = Math.floor(audioDuration / 60); //get total mins
        totalSec = Math.floor(audioDuration % 60); //get sec
        if (totalSec < 10) { //check if sec is lesser than 10,then append 0 to it
            totalSec = `0${totalSec}`;
        }
        duration.textContent = `${totalMin}:${totalSec}`;
    });
}

/**
 * @Load_lists
 */
const lists = (idx) => {
    rows.forEach(row => {
        if (row.classList.contains("active")) {
            row.classList.remove("active");
        }
    })
    rows[idx].classList.add("active");
}


/**
 * @LOADSONG
 */

const loadmusic = (idx) => {
    const item = songArry[idx];
    display.src = `./images/${item.image}`
    audio.src = `./music/${item.song}`
    songName.textContent = item.name;
    artist.textContent = item.artist;
    setCurrentTimeStamp(audio.currentTime);
    setDuration();
    lists(idx);
    currentIdx = idx;
}


function playmusic(e) {
    let isplaying = controls.classList.contains("play"); //checks for playing or pause condition,so i am using toggling classname`play` as a condition
    if (isplaying) { //check if playing `pause`
        pause()
    } else { //else `pause`
        play()
    }
}

/**
 * @PLAY
 */

function play() {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    controls.classList.add("play");
    audio.play();
}


/**
 * @PAUSE
 */

function pause() {
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
    controls.classList.remove("play");
    audio.pause();
}

/**
 * @PREVMUSIC
 */

function prevmusic(e) {
    currentIdx--
    if (currentIdx < 0) {
        currentIdx = songArry.length - 1
    }
    loadmusic(currentIdx);
    play();
}

/**
 * @NEXTMUSIC
 */

function nextmusic(e) {
    currentIdx++
    if (currentIdx >= songArry.length - 1) {
        currentIdx = 0
    }
    loadmusic(currentIdx);
    play();
}

function updateprogress(e) {
    const { currentTime, duration } = e.srcElement;
    let proggrespercent = (currentTime / duration) * 100;
    proggression.style.width = `${proggrespercent}%`
    // console.log(audio.currentTime);
    setCurrentTimeStamp(currentTime);
}

/**
 * @SETTING_THE_PROGRESS_BAR_AND_ADJUSTING_IT_TO_THE_AUDIO_CURRENT_TIME
 */
function setprogress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    //  getting the duration
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
    setCurrentTimeStamp(audio.currentTime);
}

/**
 * @SHOWLIST
 * @NT: I added onclick event directly to our cancel list btn html tag
 */

const showList = () => {
    listCont.classList.toggle("active");
}


// const removeRow = (e) => {
//     const mainDiv = e.target.parentNode.parentNode;
//     const idx = mainDiv.getAttribute("data-index")
//     mainDiv.remove();
//     songArry.splice(idx, 1);
//     if (parseInt(idx) === currentIdx) { //checks if  we are removing the playing now,then let'smove to another
//         nextmusic();
//     }
//     const rows = document.querySelectorAll(".row"); //had to reselect my nodes,because the other one is still going to be
//     rows.forEach((row, idx) => {
//         // row.setAttribute("data-index", idx);
//         row.dataset.index = `${idx}`;
//         console.log(row.dataset.index);
//     })
// }


play_btn.addEventListener("click", playmusic);
prev_btn.addEventListener("click", prevmusic);
next_btn.addEventListener("click", nextmusic);
progress_bar.addEventListener("click", setprogress);
audio.addEventListener("timeupdate", updateprogress)
progress_bar.addEventListener("touchmove", setprogress);
musisListBtn.addEventListener("click", showList)
// removeBtns.forEach(removeBtn => {
//     removeBtn.addEventListener("click", removeRow);
// })

/**
 * @LISTS
 * because of remove a single list from my music lists,i had to use HTML Atrribute(dataSet) to store my index and reference to it on my js file,instead of using default arry idx
 */


window.addEventListener("load", () => {
    loadmusic(0);
    rows.forEach((row, idx) => {
        row.addEventListener("click", (e) => {
            if (!e.target.classList.contains("fa-times")) {
                const index = row.getAttribute("data-index")
                loadmusic(index)
                showList();
                play();
                console.log("Ddffd");
            }

        })
    })
})
