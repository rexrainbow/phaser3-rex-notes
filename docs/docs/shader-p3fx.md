## Introduction

Reintroduce unsupported fx effects from phaser3.

- [Circle](#circle) : Add a circular ring around any Game Object, useful for masking / avatar frames, with custom color, width and background color.
- [Gradient](#gradient) : Draw a gradient between two colors across any Game Object, with optional 'chunky' mode for classic retro style games.
- [Shine](#shine) : Run a 'shine' effect across a Game Object, either additively or as part of a reveal.

- Author: Rex
- filter shader effects

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-p3fx)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexp3fxplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexp3fxplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.addP3Circle();
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addP3Circle();
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import P3FXPlugin from 'phaser4-rex-plugins/plugins/p3fx-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexP3FX',
                plugin: P3FXPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.addP3Circle();
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addP3Circle();
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import InstallP3Fx from 'phaser4-rex-plugins/plugins/p3fx.js';
- Register effects
    ```js
    InstallP3Fx(scene);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.addP3Circle();
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addP3Circle();
        ```

### Filter controller

#### Circle

- Apply effect to game object.
    ```javascript
    gameObject.enableFilters().focusFilters();
    var filterList = gameObject.filters.internal;
    var controller = filterList.addP3Circle(thickness, color, backgroundColor, scale, feather);
    // gameObject.filtersFocusContext = false;  // If gameObject is a Shape game object
    ```
    - `thickness` : The width of the circle around the texture, in pixels. Default value is `8`.
    - `color` : The color of the circular ring, given as a number value. Default value is `0xfeedb6`.
    - `backgroundColor` : The color of the background, behind the texture, given as a number value. Default value is `0xff0000`.
    - `scale` : The scale of the circle. Default value is `1`.
        - `1` : Full size of the underlying texture.
    - `feather` : The amount of feathering to apply to the circle from the ring. Default value is `0.005`.
- Apply effect to camera.
    ```javascript
    var filterList = camera.filters.internal;
    var controller = filterList.addP3Circle(thickness, color, backgroundColor, scale, feather);
    ```
- Disable effect
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove effect
    ```javascript
    var filterList = gameObject.filters.internal;
    filterList.remove(controller);
    ```
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
- Properties
    ```javascript
    controller.thickness = thickness;
    controller.color = color;
    controller.backgroundColor = backgroundColor;
    controller.backgroundAlpha = backgroundAlpha;
    controller.scale = scale;
    controller.feather = feather;
    ```

#### Gradient

- Apply effect to game object.
    ```javascript
    gameObject.enableFilters();
    var filterList = gameObject.filters.internal;
    var controller = filterList.addP3Gradient(color1, color2, alpha, fromX, fromY, toX, toY, size);
    ```
    - `color1`, `color2` : The first/second gradient color, given as a number value. Default values are `0xff0000`/`0x00ff00`.
    - `alpha` : The alpha value of the gradient effect.
    - `fromX`, `fromY` : The horizontal/vertical position the gradient will start from. Value between `0` and `1`.
    - `toX`, `toY` : The horizontal/vertical position the gradient will end at. Value between `0` and `1`.
    - `size` : How many 'chunks' the gradient is divided in to, as spread over the entire height of the texture.
        - `0` : Smooth gradient. Default behavior.
        - Others : Retro chunky effect.
- Apply effect to camera.
    ```javascript
    var filterList = camera.filters.internal;
    var controller = filterList.addP3Gradient(color1, color2, alpha, fromX, fromY, toX, toY, size);
    ```
- Disable effect
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove effect
    ```javascript
    var filterList = gameObject.filters.internal;
    filterList.remove(controller);
    ```
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
- Properties
    ```javascript
    controller.color1 = color1;
    controller.color2 = color2;
    controller.alpha = alpha;
    controller.fromX = fromX;
    controller.fromY = fromY;
    controller.toX = toX;
    controller.toY = toY;
    controller.size = size;
    ```

#### Shine

- Apply effect to game object.
    ```javascript
    gameObject.enableFilters();
    var filterList = gameObject.filters.internal;
    var controller = filterList.addP3Shine(speed, lineWidth, gradient, reveal);
    ```
    - `speed` : The speed of the Shine effect. Default value is `0.5`.
    - `lineWidth` : The line width of the Shine effect. Default value is `0.5`.
    - `gradient` : The gradient of the Shine effect. Default value is `3`.
    - `reveal` : Does this Shine effect reveal or get added to its target?
- Apply effect to camera.
    ```javascript
    var filterList = camera.filters.internal;
    var controller = filterList.addP3Shine(speed, lineWidth, gradient, reveal);
    ```
- Disable effect
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove effect
    ```javascript
    var filterList = gameObject.filters.internal;
    filterList.remove(controller);
    ```
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
- Properties
    ```javascript
    controller.speed = speed;
    controller.lineWidth = lineWidth;
    controller.gradient = gradient;
    controller.reveal = reveal;
    ```
