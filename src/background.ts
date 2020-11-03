/*
 * @Author: your name
 * @Date: 2020-10-28 11:12:59
 * @LastEditTime: 2020-11-03 15:46:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\background.ts
 */
'use strict'

import douYiVideo from './nodeModule/douYiVideo';
import { getProcessPath } from './nodeModule';
import ffmpegCmd from '@/nodeModule/ffmpegCmd.ts';
import fluentFfmpeg from '@/nodeModule/fluentFfmpeg.ts';
import { app, protocol, BrowserWindow, Menu, globalShortcut, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null | any

ipcMain.on('GetDouYiPlayUrl', async (event, userUrl) => {
  const douYin = new douYiVideo({userUrl});
  const list = await douYin.shareCodeParsing();
  event.reply('BackGetDouYiPlayUrl', list);
  console.log(douYin);
})
ipcMain.on('ShowSaveDirectory', async (event, arg) => {
  const obj: any = dialog.showOpenDialogSync({ properties: ['openFile', 'openDirectory', 'showHiddenFiles'] })
  console.log(obj[0], '-------')
  if (obj[0]) {
    event.reply('BackShowSaveDirectory',obj[0]);
  }
})


ipcMain.on('getProcessPath', (event, arg) => {
  console.log(event, arg)
  event.reply('getProcessPath', getProcessPath())
})


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createMenu () {
  //设置菜单
  let dockMenu = Menu.buildFromTemplate([
    {
      label: '文件',
      click: function () {
          console.log('点击事件');
      }
    },
    {
      label: '编辑',
      submenu: [
          {label: '保存'},
          {label: '另存'}
      ]
    },
    {label: '帮助'}
  ]);
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(dockMenu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(dockMenu)
  }
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: (process.env
      //     .ELECTRON_NODE_INTEGRATION as unknown) as boolean
      nodeIntegration: true
    }
  })
  createMenu()
  console.log('是否完整支持node', process.env.ELECTRON_NODE_INTEGRATION)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools()
  })
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
