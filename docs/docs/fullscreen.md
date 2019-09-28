## Introduction

Enable or disable full screen mode, built-in method of phaser.

- Author: Richard Davey

## Usage

### Enable/disable

Under any input event ([touch](touchevents.md) or [keyboard](keyboardevents.md))

```javascript
gameObject.setInteractive().on('pointerdown', function() {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // On stop fulll screen
    } else {
        scene.scale.startFullscreen();
        // On start fulll screen
    }
});
```

Fire one of these events

- `'fullscreenunsupported'` : Tried to enter fullscreen mode, but it is unsupported by the browser.
- `'enterfullscreen'` : Entered fullscreen mode successfully.
- `'fullscreenfailed'` : Tried to enter fullscreen mode but failed.

### Toggle

Under any input event ([touch](touchevents.md) or [keyboard](keyboardevents.md))

```javascript
gameObject.setInteractive().on('pointerdown', function() {
    scene.scale.toggleFullscreen();
    if (scene.scale.isFullscreen) {
        // On start fulll screen
    } else {
        // On stop fulll screen
    }
});
```

- Fire `'fullscreenunsupported'` or `'enterfullscreen'` event.

### State

- Is in full screen mode
    ```javascript
    var isFullScreen = scene.scale.isFullscreen;
    ```
- Support full screen
    ```javascript
    var supported = Phaser.Device.Fullscreen.available;
    ```

### Events

- Full screen mode unsupported
    ```javascript
    scene.scale.on('fullscreenunsupported', function() {});
    ```
- Enter full screen mode
    ```javascript
    scene.scale.on('enterfullscreen', function() {});
    ```
