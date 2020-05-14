## Introduction

Drag thumb on a slider bar.

- Author: Rex
- Behavior of game object

## Live demos

- [Slider](https://codepen.io/rexrainbow/pen/eKJGZB)
- [Color picker](https://codepen.io/rexrainbow/pen/XWmgMaX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/slider)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);
    ```
- Add slider behavior
    ```javascript
    var slider = scene.plugins.get('rexsliderplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SliderPlugin from 'phaser3-rex-plugins/plugins/slider-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSlider',
                plugin: SliderPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add slider behavior
    ```javascript
    var slider = scene.plugins.get('rexSlider').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Slider from 'phaser3-rex-plugins/plugins/slider.js';
    ```
- Add slider behavior
    ```javascript
    var slider = new Slider(gameObject, config);
    ```

### Create instance

```javascript
var slider = scene.plugins.get('rexSlider').add(gameObject, {
    // endPoints: [
    //     {x:0, y:0},
    //     {x:0, y:0}
    // ],
    // value: 0,
    // enable: true,

    // valuechangeCallback: null,
    // valuechangeCallbackScope: null
});
```

- `endPoints` : An array of 2 end-points (`[{x,y}, {x,y}]`)
- `value` : Initial value between 0 to 1
- `enable` : Set true to drag thumb
- `valuechangeCallback` , `valuechangeCallbackScope` : Bind this callback to [`valuechange` event](slider.md#events)

### Set end-points

```javascript
slider.setEndPoints(p0x, p0y, p1x, p1y);
// slider.setEndPoints(p0, p1); // p0, p1: {x, y}
// slider.setEndPoints(points); // points: [p0, p1]
```

### Get value

```javascript
var value = slider.value;          // value: between 0 to 1
// var value = slider.getValue();  // value: between 0 to 1
// var value = slider.getValue(min, max);  // value: between min to max
```

### Set value

```javascript
slider.value = newValue;       // newValue: between 0 to 1
// slider.setValue(newValue);  // newValue: between 0 to 1
// slider.setValue(newValue, min, max);  // newValue: between min to max
```

```javascript
slider.addValue(inc);  // inc: between 0 to 1
// slider.addValue(inc, min, max);  // inc: between min to max
```

Fires `valuechange` event if new value is not equal to current value.

### Events

- Value changed
    ```javascript
    slider.on('valuechange', function(newValue, prevValue){ /* ... */ });
    ```
    - newValue: between 0 to 1
    - prevValue: between 0 to 1

### Drag

#### Drag enable

- Get
    ```javascript
    var enable = slider.enable;
    ```
- Set
    ```javascript
    slider.setEnable(enable);  // enable: true, or false
    slider.enable = enable;
    ```
- Toggle
    ```javascript
    slider.toggleEnable();
    ```

#### Is dragging

```javascript
var isDragging = slider.isDragging;
```