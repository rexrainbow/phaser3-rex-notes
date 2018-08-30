## Introduction

Drag thumb on a slider bar.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/slider-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexsliderplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/slider)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexSlider from './plugins/slider.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import SliderPlugin from './plugins/slider-plugin.js';

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

```javascript
slider.setEnable();
// slider.setEnable(false);  // disable
```

#### Is dragging

```javascript
var isDragging = slider.isDragging;
```