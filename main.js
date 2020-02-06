const { app, BrowserWindow, globalShortcut} = require('electron')

function createWindow () {
  
  win = new BrowserWindow({
    opacity: 0.7,
    width: 0,
    height: 0,
    frame: false,
    backgroundColor: '#000000',
    x: 1500,
    y: 100,
    webPreferences: {
      nodeIntegration: true
    }
  })
win.loadFile('widget/index.html')

// Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  const shortcut = globalShortcut.register('Control+P', () => {
    win.show()
  })

  if (!shortcut) { 
    console.log('Shortcut Registration failed.') 
  }
  const closeShortcut = globalShortcut.register('Control+O', () => {
    win.hide()
  })

  if (!closeShortcut) { 
    console.log('Close Shortcut Registration failed.') 
  }
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})