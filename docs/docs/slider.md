## Introduction

Drag thumb on a slider bar.

- Author: Rex
- Behavior of game object

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/slider-plugin.js)

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
gameObject.slider = scene.plugins.get('rexSlider').add(gameObject, {
    // endPoints: [
    //     {x:0, y:0},
    //     {x:0, y:0}
    // ],
    // value: 0,
    // dragEnable: true
});
```

Properties

- endPoints : an array of 2 end-points (`[{x,y}, {x,y}]`)
- value: initial value between 0 to 1
- dragEnable: set true to drag thumb

### Set end-points

```javascript
gameObject.slider.setEndPoints(p0x, p0y, p1x, p1y);
// gameObject.slider.setEndPoints(p0, p1); // p0, p1: {x, y}
// gameObject.slider.setEndPoints(points); // points: [p0, p1]
```

### Get value

```javascript
var value = gameObject.slider.value;          // value: between 0 to 1
// var value = gameObject.slider.getValue();  // value: between 0 to 1
// var value = gameObject.slider.getValue(min, max);  // value: between min to max
```

### Set value

```javascript
gameObject.slider.value = newValue;       // newValue: between 0 to 1
// gameObject.slider.setValue(newValue);  // newValue: between 0 to 1
// gameObject.slider.setValue(newValue, min, max);  // newValue: between min to max
```

```javascript
gameObject.slider.addValue(inc);  // inc: between 0 to 1
// gameObject.slider.addValue(inc, min, max);  // inc: between min to max
```

Fires `valuechange` event if new value is not equal to current value.

### Events

- Value changed
    ```javascript
    gameObject.slider.on('valuechange', function(newValue, prevValue){ /* ... */ });
    ```
    - newValue: between 0 to 1
    - prevValue: between 0 to 1

### Drag

#### Drag enable

```javascript
gameObject.slider.setDragEnable();
// gameObject.slider.setDragEnable(false);  // disable
```

#### Is dragging

```javascript
var isDragging = gameObject.slider.isDragging;
```