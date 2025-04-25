import { defineConfig } from "electron-vite";
import vue from "@vitejs/plugin-vue"; // 静态导入 Vue 插件

export default defineConfig({
  main: {
    entry: "src/main/index.js",
    optimizeDeps: {
      include: ["src/main/index.js"], // 加入主进程入口到预优化列表
    },
  },
  preload: {
    entry: "src/preload/index.js",
    optimizeDeps: {
      include: ["src/preload/index.js"], // 加入预加载进程入口到预优化列表
    },
  },
  renderer: {
    base: "./", // 设置静态资源基础路径，确保打包后资源路径正确
    plugins: [
      vue(), // 使用静态导入的 Vue 插件
    ],
    server: {
      port: 5176,
    },
    build: {
      rollupOptions: {
        input: {
          main: "src/renderer/index.html",
        },
      },
    },
    watch: {
      // 监听渲染进程文件变化
      include: ["src/renderer/**"],
    },
  },
});
