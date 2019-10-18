## Introduction

Get information of device, built-in properties of phaser.

- Author: Richard Davey

## Usage

### OS

- Platform 
    ```javascript
    scene.sys.game.device.os.android      // Is running on android?
    scene.sys.game.device.os.chromeOS     // Is running on chromeOS?
    scene.sys.game.device.os.cordova      // Is the game running under Apache Cordova?
    scene.sys.game.device.os.crosswalk    // Is the game running under the Intel Crosswalk XDK?
    scene.sys.game.device.os.desktop      // Is running on a desktop?
    scene.sys.game.device.os.ejecta       // Is the game running under Ejecta?
    scene.sys.game.device.os.electron     // Is the game running under GitHub Electron?
    scene.sys.game.device.os.iOS          // Is running on iOS?
    scene.sys.game.device.os.iPad         // Is running on iPad?
    scene.sys.game.device.os.iPhone       // Is running on iPhone?
    scene.sys.game.device.os.kindle       // Is running on an Amazon Kindle?
    scene.sys.game.device.os.linux        // Is running on linux?
    scene.sys.game.device.os.macOS        // Is running on macOS?
    scene.sys.game.device.os.node         // Is the game running under Node.js?
    scene.sys.game.device.os.nodeWebkit   // Is the game running under Node-/Webkit?
    scene.sys.game.device.os.webApp       // Set to true if running as a WebApp, i.e. within a WebView
    scene.sys.game.device.os.windows      // Is running on windows?
    scene.sys.game.device.os.windowsPhone // Is running on a Windows Phone?
    ```
- Major version number of ios
    ```javascript
    var version = scene.sys.game.device.os.iOSVersion;
    ```
- Pixel-ratio of the host device
    ```javascript
    var pixelRatio = scene.sys.game.device.os.pixelRatio;
    ```

### Browser

- Platform
    ```javascript
    scene.sys.game.device.browser.chrome       // Is running in Chrome?
    scene.sys.game.device.browser.edge         // Is running in Microsoft Edge browser?
    scene.sys.game.device.browser.firefox      // Is running in Firefox?
    scene.sys.game.device.browser.ie           // Is running in Internet Explorer 11 or less (not Edge)?
    scene.sys.game.device.browser.mobileSafari // Is running in Mobile Safari?
    scene.sys.game.device.browser.opera        // Is running in Opera?
    scene.sys.game.device.browser.safari       // Is running in Safari?
    scene.sys.game.device.browser.silk         // Is running in the Silk browser (as used on the Amazon Kindle)?
    scene.sys.game.device.browser.trident       // Is running a Trident version of Internet Explorer (IE11+)?
    ```
- Version
    ```javascript
    var version = scene.sys.game.device.browser.chromeVersion;
    var version = scene.sys.game.device.browser.firefoxVersion;
    var version = scene.sys.game.device.browser.ieVersion;
    var version = scene.sys.game.device.browser.safariVersion;
    var version = scene.sys.game.device.browser.tridentVersion;
    ```

### Video

```javascript
var h264Video = scene.sys.game.device.video.h264;  // Can this device play h264 mp4 video files?
var hlsVideo = scene.sys.game.device.video.hls;    // Can this device play hls video files?
var mp4Video = scene.sys.game.device.video.mp4;    // Can this device play h264 mp4 video files?
var oggVideo = scene.sys.game.device.video.ogg;    // Can this device play ogg video files?
var vp9Video = scene.sys.game.device.video.vp9;    // Can this device play vp9 video files?
var webmVideo = scene.sys.game.device.video.webm;  // Can this device play webm video files?
```