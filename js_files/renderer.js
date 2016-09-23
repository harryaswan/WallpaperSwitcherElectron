// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer;
const WallMan = require("HASWallpaperManager");

console.log('Window Loaded', window);


var input_box = document.getElementById('input_bar');
var action_button = document.getElementById('action_button');
var win_button = document.getElementById('newWinBtn');

action_button.value = "Click Me";

action_button.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Button Presses");
    console.log("Input box contains:", input_box.value);
    ipcRenderer.send('get-data', input_box.value);
});


win_button.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../html_files/mini_window.html')
    let win = new BrowserWindow({ frame: false, width: 400, height: 320 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
});

var createImageElement = function (link) {

    let url = link.preview.images[0].resolutions[2].url;
    let cleanURL = WallMan.helper.cleanURL(url);

    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');
    p.innerText = link.title;
    img.setAttribute('src', cleanURL);
    button.value = "Set As Wallpaper"
    button.addEventListener('click', function (e) {
        console.log('setting wallpaper', link.url);
        new WallMan.app().handleURL(link.url)
        .then(function (d) {
            console.log('hrtrasdf');
        })
        .catch(function (err) {
            console.error(err);
        });
    });

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    return div;
}



ipcRenderer.on('got-data', function (e, data) {
    console.log('got data back', data);

    for (var link of data) {
        if (!link.data.is_self) document.getElementById('display_box').appendChild(createImageElement(link.data));
    }
})
