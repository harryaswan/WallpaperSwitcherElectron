const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer;

var localConfig = require('electron').remote.getGlobal('config');

// function cloneObject(obj) {
//     var newObj = {};
//     for (key in obj) {
//         newObj[key] = obj[key];
//     }
//     return newObj;
// }
//
// var localConfig = cloneObject(global.config);

console.log('localConfig',localConfig);

function createSettingsElement(setting) {
    var div = document.createElement('div');
    var label = document.createElement('label');
    var input = document.createElement('input');

    label.innerText = setting;
    label.setAttribute('for', setting + "_input");

    input.setAttribute('type', 'text');
    input.value = localConfig[setting];
    input.setAttribute('id', setting + "_input")
    input.addEventListener('change', function (e) {
        e.preventDefault();
        localConfig[setting] = input.value;
    });

    div.appendChild(label);
    div.appendChild(input);

    return div;
}


for (setting of Object.keys(localConfig)) {
    console.log('l', setting);
    document.getElementById('settings_box').appendChild(createSettingsElement(setting));
}

document.getElementById('save_btn').addEventListener('click', function (e) {
    e.preventDefault();
    console.log('save config', localConfig);
    ipcRenderer.send('save-config', localConfig);
})
