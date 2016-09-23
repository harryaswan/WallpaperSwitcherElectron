const electron = require('electron');
const Menu = electron.Menu

let template = [
    {
        label: "WallpaperManager",
        submenu: [
            {
                label: process.platform === 'darwin' ? electron.app.getName() : 'File',
                click: function () {
                    console.log("Go To Settings");
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
