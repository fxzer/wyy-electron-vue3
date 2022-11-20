import { rmSync } from "fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-electron-plugin";
import { customStart, loadViteEnv } from "vite-electron-plugin/plugin";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";
const  { resolve } = require('path')
// import { fileURLToPath, URL } from "url";

rmSync("dist-electron", { recursive: true, force: true });

export default defineConfig({
  plugins: [
    vue(),
    electron({
      include: ["electron"],
      transformOptions: {
        sourcemap: !!process.env.VSCODE_DEBUG,
      },
      plugins: [
        ...(process.env.VSCODE_DEBUG
          ? [
              customStart(
                debounce(() =>
                  console.log(
                    /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
                  )
                )
              ),
            ]
          : []),
        loadViteEnv(),
      ],
    }),
    renderer({
      nodeIntegration: true,
    }),
  ],
  server: process.env.VSCODE_DEBUG
    ? (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })()
    : {
        proxy: {
          "/api": {
            target: "http://127.0.0.1:3000",
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
  clearScreen: false,
  build: {
    assetsDir: "", // #287
  },
  //别名
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      '@': resolve('./src')
    },
  },
  // css 预处理器
    css: {
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
          additionalData: '@import "@/main.scss";'
          // additionalData: '@use "@/assets/scss/global.scss" as *;'
        }
      }
    },
});

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299) {
  let t: NodeJS.Timeout;
  return ((...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  }) as Fn;
}
