## Introduction

Scale game window, built-in method of phaser.

- Author: Richard Davey

## Usage

### Setup

Setup scale mode in [game configuration](game.md#configuration).

```javascript
var config = {
    // ...
    parent: divId,

    // Game size
    width: 1024,
    height: 768,

    scale: {
        // Or set parent divId here
        parent: divId,

        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        // Or put game size here
        // width: 1024,
        // height: 768,

        // Minimum size
        min: {
            width: 800,
            height: 600
        },
        // Or set minimum size like these
        // mixWidth: 800,
        // mixHeight: 600,

        // Maximum size
        max: {
            width: 1600,
            height: 1200
        }
        // Or set maximum size like these
        // maxWidth: 1600,
        // maxHeight: 1200,

        zoom: 1,  // Size of game canvas = game size * zoom
    },
    autoRound: false
    // ...
};
var game = new Phaser.Game(config);
```

- `scale.mode` :
    - `Phaser.Scale.NONE` : No scaling happens at all.
    - `Phaser.Scale.FIT` : The width and height are automatically adjusted to fit inside the given target area, while keeping the aspect ratio. Depending on the aspect ratio there may be some space inside the area which is not covered.
    - `Phaser.Scale.ENVELOP` : The width and height are automatically adjusted to make the size cover the entire target area while keeping the aspect ratio. This may extend further out than the target size.
    - `Phaser.Scale.WIDTH_CONTROLS_HEIGHT` : The height is automatically adjusted based on the width.
    - `Phaser.Scale.HEIGHT_CONTROLS_WIDTH` : The width is automatically adjusted based on the height.
    - `Phaser.Scale.RESIZE` : The Canvas is resized to fit all available _parent_ space, regardless of aspect ratio.
- `scale.autoCenter` :
    - `Phaser.Scale.NO_CENTER` : The game canvas is not centered within the parent by Phaser.
    - `Phaser.Scale.CENTER_BOTH` : The game canvas is centered both horizontally and vertically within the parent.
    - `Phaser.Scale.CENTER_HORIZONTALLY` : The game canvas is centered horizontally within the parent.
    - `Phaser.Scale.CENTER_VERTICALLY` : The game canvas is centered both vertically within the parent.

### Resize canvas element

```javascript
scene.scale.resize(width, height);
```

Modify the size of the Phaser canvas element directly. You should only use this if you are using the `NO_SCALE` scale mode,

### Set game size

```javascript
scene.scale.setGameSize(width, height);
```

It should only be used if you're looking to change the base size of your game and are using one of the Scale Manager scaling modes, i.e. `FIT`. If you're using `NO_SCALE` and wish to change the game and canvas size directly, then please use the `resize` method instead.

### Events

```javascript
scene.scale.on('resize', function(gameSize, baseSize, displaySize, previousWidth, previousHeight) {});
```

- `gameSize`
    - `gameSize.width`, `gameSize.height`
- `baseSize`
    - `baseSize.width`, `baseSize.height`
- `displaySize`
    - `displaySize.width`, `displaySize.height`

### Update bounds

This method dose not have to be invoked, unless the canvas position, or visibility is changed via any other method (i.e. via an Angular route).

```javascript
scene.scale.updateBounds();
```

### Full screen

Under `'pointerup'` touch event :

- Start full screen
    ```javascript
    scene.scale.startFullscreen();
    ```
- Stop full screen
    ```javascript
    scene.scale.stopFullscreen();
    ```
- Toggle full screen
    ```javascript
    scene.scale.toggleFullscreen();
    ```
- Is full screen
    ```javascript
    var isFullscreen = scene.scale.isFullscreen;
    ```

Games within an iframe will also be blocked from fullscreen 
unless the iframe has the `allowfullscreen` attribute.

Performing an action that navigates to another page, 
or opens another tab, will automatically cancel fullscreen mode, 
as will the user pressing the ESC key.

#### Events

- Enter full screen
    ```javascript
    scene.scale.on('enterfullscreen', function() {}, scope);
    ```
- Enter full screen failed
    ```javascript
    scene.scale.on('fullscreenfailed', function(error) {}, scope);
    ```
- Leave full screen
    ```javascript
    scene.scale.on('leavefullscreen', function() {}, scope);
    ```
- Full screen unsupport
    ```javascript
    scene.scale.on('fullscreenunsupported', function() {}, scope);
    ```
- Leave full screen
    ```javascript
    scene.scale.on('leavefullscreen', function() {}, scope);
    ```

### Orientation 

```javascript
scene.scale.on('orientationchange', function(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {

    } else if (orientation === Phaser.Scale.LANDSCAPE) {

    }
}, scope);
```