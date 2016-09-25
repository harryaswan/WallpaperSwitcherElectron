const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = require('electron').ipcMain;
const path = require('path');
const WallMan = require("HASWallpaperManager");

global.config = require('./js_files/default_configs.js');
global.app_root = __dirname;
global.app_config = path.join(global.app_root, './data/config.json');
global.config.image_folder = path.join(global.app_root, global.config.image_folder);

// let global.mainWindow

function createWindow () {
    global.mainWindow = new BrowserWindow({width: 800, height: 600})

    global.mainWindow.loadURL(`file://${__dirname}/html_files/index.html`)
    global.mainWindow.webContents.openDevTools()

    global.mainWindow.on('closed', function () {
        global.mainWindow = null
    });
}

app.setName("WallpaperManager");

app.on('ready', function () {
    WallMan.os.checkFolders('./data');
    WallMan.os.loadFile(global.app_config, false)
    .then(function (file) {
        global.config = JSON.parse(file);
    })
    .catch(function (error) {
        WallMan.os.saveFile(global.app_config, JSON.stringify(global.config))
        .then(function (fileName) {
            console.log('Config saved');
        })
        .catch(function (error) {
            console.error(error);
        })
    });
    createWindow();
})

app.on('window-all-closed', function () {
    // if (process.platform !== 'darwin') {
    app.quit()
    // }
})

app.on('activate', function () {
    if (global.mainWindow === null) {
        createWindow()
    }
})

require("./main_process/actions.js")
require("./main_process/menu.js")
