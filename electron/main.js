import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import DatabaseService from './database/Database.js';
import IPCManager from './ipc/IPCManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.webContents.on('did-fail-load', (_, code, desc) => {
    console.log('LOAD FAILED :', code, desc);
  });

  win.webContents.on('console-message', (_, level, message) => {
    console.log('[Renderer]', message);
  });

  win.webContents.on('render-process-gone', (_, detail) => {
    console.log('Renderer Gone :', detail);
  });

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools({
      mode: 'detach'
    });
  }

  win.loadURL('http://127.0.0.1:5173');

  // Initialize IPC Manager
  IPCManager.initialize(win);
}

app.on('ready', () => {
  try {
    // Initialize database
    DatabaseService.initialize();
    createWindow();
  } catch (error) {
    console.error('Failed to initialize application:', error);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  // Cleanup
  DatabaseService.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('quit', () => {
  DatabaseService.close();
});