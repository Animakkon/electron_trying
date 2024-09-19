import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { exec  } from 'child_process'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('node:os')

import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import getBreweriesByTypeAndPage from '../renderer/src/axios/brewery-request'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: true,
      additionalArguments: [
        `--content-security-policy=${"default-src 'self'; connect-src 'self' http://127.0.0.1:8000 ws://localhost:5173;"}`
      ]
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // be there earlier
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('show_something', (event, messageType) => {
    if (messageType) {
      console.log(`${messageType}:`)
      switch (messageType) {
        case 'ping':
          event.reply('show_something_output', 'this was nice')
          break
        case 'open_terminal':
          shutDownWsl(event, 'wsl --shutdown')
          break
        case 'system-info':
          try {
            const systemInfo = {
              platform: os.platform(),
              arch: os.arch(),
              totalMemory: os.totalmem(),
              freeMemory: os.freemem(),
              uptime: os.uptime(),
            }
            event.reply('show_something_output', systemInfo)
          } catch (e) {
            console.error(`Error fetching system info: ${e.message}`)
            event.reply('show_something_output', e.message)
          }
          break
        default:
          console.log('ping 2')
          event.reply('show_something_output', 'this was nice 2')
      }
    }
  })

  ipcMain.on('fetch-breweries', async (event, args) => {
    try {
      const responce = await getBreweriesByTypeAndPage(args ?? {})
      event.reply('fetchBreweries', responce.data)
    } catch (e) {
      console.error('Error fetching breweries:', e);
      event.reply('fetchBreweries', { error: e.message })
    }
  })

  createWindow()

  app.on('activate', function () {
    // for mac OS
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// To exit
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function shutDownWsl(event, command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      event.reply('command-show_something_output', `Error: ${error.message}`)
      return
    }
    if (stderr) {
      event.reply('command-show_something_output', `Error: ${stderr}`)
    }
    event.reply('show_something_output', `Stdout: у меня сработало)`)
  })
}
