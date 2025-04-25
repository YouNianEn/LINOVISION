import { app, BrowserWindow, protocol, dialog } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { constants } from "fs";
import { autoUpdater } from "electron-updater";

// 自定义协议处理函数
function registerLocalResourceProtocol() {
  protocol.handle("local-resource", async (request) => {
    const url = request.url.replace(/^local-resource:\/\//, "");
    const filePath = fileURLToPath("file://" + decodeURIComponent(url));
    try {
      console.log("Trying to access file:", filePath);
      // 检查文件是否存在
      await fs.promises.access(filePath, constants.R_OK);
      return new Response(fs.createReadStream(filePath));
    } catch (error) {
      console.error("Error accessing file:", error);
      return new Response(null, { status: 404 });
    }
  });
}

function createWindow() {
  const __file_name = fileURLToPath(import.meta.url);
  const __dir_name = dirname(__file_name);
  const preloadPath = join(__dir_name, "../../out/preload/index.mjs");
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: preloadPath, // 预加载脚本相对路径
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
    },
    // autoHideMenuBar: true, // 自动隐藏菜单栏
    // menu: null, // 移除菜单栏
  });

  if (app.isPackaged) {
    win.loadFile(join("out", "renderer", "index.html")); // 正确相对路径
  } else {
    win.loadURL("http://localhost:5176");
  }
}

app.whenReady().then(() => {
  registerLocalResourceProtocol();
  createWindow();

  // 检查更新
  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// 监听更新下载完成事件
autoUpdater.on("update-downloaded", (info) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "App Updates",
    message:
      "A new version has been found. Do you want to restart the app immediately to complete the update?",
    detail: `New version content:${info.releaseNotes}`,
  };
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

// 监听更新错误事件
autoUpdater.on("error", (message) => {
  console.error("Update error:", message);
});

// 监听更新可用事件
autoUpdater.on("update-available", () => {
  console.log("Update Available");
});

// 监听更新不可用事件
autoUpdater.on("update-not-available", () => {
  console.log("No updates available");
});
