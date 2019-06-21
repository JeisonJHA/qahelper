const path = require('path');
module.exports = is =>
  Object.assign(
    {},
    {
      vibrancy: 'dark',
      transparent: true,
      show: false,
      titleBarStyle: 'hiddenInset',
      useContentSize: true,
      center: true,
      webPreferences: {
        nodeIntegrationInWorker: true,
        nodeIntegration: true,
        preload: path.join(__dirname, '../../preload.js')
      },
    },
    // Fix unavailable vibrancy on non-macOS devices
    !is.macOS() && {
      backgroundColor: '#7f7f7f',
    }
  );
