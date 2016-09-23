const ipcMain = require('electron').ipcMain;
const WallMan = require("HASWallpaperManager");

var wallManApp = new WallMan.app();

ipcMain.on('testing', function (e, d) {
    console.log("Other get", d);

});


ipcMain.on('get-data', function (event, data, webConts) {

    console.log('webcons', webConts);

    // let win = BrowserWindow.get
    // ipcMain.send('addedNum', (d + 1));

    wallManApp.getArrayOfLinks(data)
    .then(function (linkData) {
        console.log('got to here');
        global.mainWindow.webContents.send('got-data', linkData)
    })
    .catch(function (error) {
        console.error(error);
    })


});
