let {ipcRenderer} = require('electron')

let myButton = document.getElementById('myButton');
let myLink = document.getElementById('myLink');

function clickHandler(){
    var message = myLink.value;
    console.log('go emitted')
    ipcRenderer.send('go', message)
}