let {ipcRenderer} = require('electron')

let myWebview = document.getElementById('webview');

ipcRenderer.on('go', (event, args)=>{
    console.log('go emitted')
    console.log(args)
    myWebview.src = args;
})