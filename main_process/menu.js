const BrowserWindow = require('electron').BrowserWindow
const path = require('path')
const electron = require('electron');
const Menu = electron.Menu


const modalPath = path.join('file://', __dirname, '../html_files/settings.html')
var win;

function openSettings() {
    if (!win) {
        win = new BrowserWindow({ width: 400, height: 320, parent: global.mainWindow, modal: true, show: false })
        win.on('close', function () { win.hide() })
        win.loadURL(modalPath)
    }
    if (win.isVisible()) {
        win.hide()
    } else {
        win.show()
    }
}


let template = [
    {
        label: process.platform === 'darwin' ? electron.app.getName() : 'File',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click: function (item, focusedWindow) {
                  if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                label: "Settings",
                accelerator: 'Ctrl+,',
                click: openSettings
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
