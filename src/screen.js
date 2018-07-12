let {ipcRenderer} = require('electron')

// let myWebview = document.getElementById('webview');
let myPlayer = document.getElementById('player');
var globalVideoId;

ipcRenderer.on('go', (event, args)=>{
    console.log('go emitted')
    console.log(args)
    var tempArgs = args.split('v=')
    globalVideoId = tempArgs[tempArgs.length-1];
    var tempIndex = globalVideoId.indexOf('&');
    if(tempIndex != -1){
        globalVideoId = globalVideoId.substring(0, tempIndex);
    } else {
        globalVideoId = '9sWEecNUW-o';
    }
    console.log(globalVideoId);
    player.videoId = globalVideoId;
    player.playVideo();
    fullScreen();
})

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: globalVideoId | '9sWEecNUW-o',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    setTimeout(fullScreen, 1000);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
    fullScreen();
    // setTimeout(stopVideo, 6000);
    done = true;
}
}
function stopVideo() {
    player.stopVideo();
}
function fullScreen() {
var e = document.getElementById("player");
if (e.requestFullscreen) {
    e.requestFullscreen();
} else if (e.webkitRequestFullscreen) {
    e.webkitRequestFullscreen();
} else if (e.mozRequestFullScreen) {
    e.mozRequestFullScreen();
} else if (e.msRequestFullscreen) {
    e.msRequestFullscreen();
}
console.log('fullScreen()')
}