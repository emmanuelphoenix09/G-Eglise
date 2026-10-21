// Préchargement volontairement minimal : aucun accès Node.js n'est exposé à la page.
const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("gEgliseDesktop", Object.freeze({
  platform: process.platform,
  desktop: true,
  appName: "G-Eglise"
}));
