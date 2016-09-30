const ipcMain = require('electron').ipcMain;
const WallMan = require("HASWallpaperManager");


var wallManApp = new WallMan.app(global.config);

console.log("global.config.image_folder",global.config.image_folder);

WallMan.os.checkFolders(global.config.image_folder);


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


ipcMain.on('set-as-wallpaper', function (e, url) {
    wallManApp.handleURL(url)
    .then(function () {
        console.log("Wallpaper Set");
    })
    .catch(function (err) {
        console.error('ERROR:', err);
    });
});


ipcMain.on('save-config', function (e, config) {
    console.log('got new config', config);
    global.config = config;
    WallMan.os.saveFile(global.app_config, JSON.stringify(global.config))
    .then(function(d) {
        console.log("Saved!", d);
    })
    .catch(function (err) {
        console.error("Error", err);
    })
})
