let {ipcRenderer} = require('electron')

// let myWebview = document.getElementById('webview');
var videoId;

ipcRenderer.on('go', (event, args)=>{
    console.log('go emitted')
    console.log(args)
    var tempArgs = args.split('v=')
    videoId = tempArgs[tempArgs.length-1];
    var tempIndex = videoId.indexOf('&');
    if(tempIndex != -1) videoId = videoId.substring(0, tempIndex);
    console.log(videoId);
    player.videoId = videoId;
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
    videoId: '9sWEecNUW-o',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
    fullScreen();
    setTimeout(stopVideo, 6000);
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
}