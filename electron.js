const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    icon: path.join(__dirname, 'public/myicon-512x512.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 加载应用
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  
  // 设置窗口标题
  mainWindow.setTitle('今日黃曆');
  
  // 禁用菜单栏
  mainWindow.setMenu(null);
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // 在macOS上，当点击dock图标并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
