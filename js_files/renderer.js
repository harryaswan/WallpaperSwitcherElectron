// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer;
const WallMan = require("HASWallpaperManager");

console.log('Window Loaded', window);


var input_box = document.getElementById('input_bar');
var search_form = document.getElementById('search');
var win_button = document.getElementById('newWinBtn');

search_form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form sent");
    console.log("Input box contains:", input_box.value);
    ipcRenderer.send('get-data', input_box.value);
});

var createImageElement = function (link) {
    console.log('link', link);
    let url;
    if (link.preview.images[0].resolutions.length > 2) {
        url = link.preview.images[0].resolutions[2].url;
    } else {
        url = link.preview.images[0].resolutions[0].url;
    }
    let cleanURL = WallMan.helper.cleanURL(url);

    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let setButton = document.createElement('button');
    let saveButton = document.createElement('button');
    p.innerText = link.title;
    img.setAttribute('src', cleanURL);
    setButton.innerText = "Set As Wallpaper"
    setButton.addEventListener('click', function (e) {
        console.log('setting wallpaper', link.url);
        ipcRenderer.send('set-as-wallpaper', link.url);
    });
    saveButton.innerText = "Add to Favorites"
    saveButton.addEventListener('click', function (e) {
        console.log('add to fav', link.url);
        ipcRenderer.send('add-to-favs', link.url);
        let favElm = document.createElement('div');
        favElm.appendChild(img);
        favElm.appendChild(p);
        favElm.appendChild(setButton);
        document.getElementById('favs_box').appendChild(favElm);
    });

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(setButton);
    div.appendChild(saveButton);
    return div;
}



ipcRenderer.on('got-data', function (e, data) {
    console.log('got data back', data);
    document.getElementById('display_box').innerText = null;
    for (var link of data) {
        if (!link.data.is_self) document.getElementById('display_box').appendChild(createImageElement(link.data));
    }
})
