## Introduction

Scale game window, built-in method of phaser.

- Author: Richard Davey

## Usage

### Setup

Setup scale mode in [game configuration](game.md#configuration).

```javascript
var config = {
    // ...
    parent: null,
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
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
scene.scale.on('resize', function(gameSize, baseSize, displaySize, resolution, previousWidth, previousHeight) {});
```

- `gameSize`
    - `gameSize.width`, `gameSize.height`
- `baseSize`
    - `baseSize.width`, `baseSize.height`
- `displaySize`
    - `displaySize.width`, `displaySize.height`