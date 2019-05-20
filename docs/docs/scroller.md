## Introduction

Drag content. Slow down when dragging released, pull back when out of bounds.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/scroller-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexscrollerplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/scroller)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexScroller from './plugins/scroller.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import ScrollerPlugin from './plugins/scroller-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexScroller',
            plugin: ScrollerPlugin,
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
var scroller = scene.plugins.get('rexScroller').add(gameObject, {
    bounds: [
        bottomBound,
        topBound
    ],
    value: topBound,
    // threshold: 10,
    // slidingDeceleration: 5000,
    // backDeceleration: 2000,
    // enable: true,
    // orientation: 'vertical',

    // valuechangeCallback: null,
    // valuechangeCallbackScope: null,

    // overmaxCallback: null,
    // overmaxCallbackScope: null,

    // overminCallback: null,
    // overminCallbackScope: null,
});
```

- `bounds` : An array of 2 values [bound0, bound1]
- `value` : Initial value between bound0 and bound1
    - Map this value to position of content under [event 'valuechange'](scroller.md#events)
- `threshold` : Minimal movement to scroll. Set `0` to scroll immediately.
- `slidingDeceleration` : Deceleration of slow down when dragging released.
    - Set `false` to disable it.
- `backDeceleration` : Deceleration of pull back when out of bounds.
    - Set `false` to disable it.
- `enable` : Set true to get dragging events.
- `orientation` :
    - `'vertical'`,`'v'`, `'y'`, or `0` : dragging on vertical/y axis.
    - `'horizontal'`,`'h'`, `'x'`, or `1` : dragging on horizontal/x axis.
- `valuechangeCallback` , `valuechangeCallbackScope` : Bind this callback to [`valuechange` event](scroller.md#events)
- `overminCallback` , `overmaxCallbackScope` : Bind this callback to [`overmax` event](scroller.md#events)
- `overminCallback` , `overminCallbackScope` : Bind this callback to [`overmin` event](scroller.md#events)

### Set bounds

```javascript
this.setBounds(bounds);  // bounds: [bound0, bound1]
// this.setBounds(bound0, bound1);
```

### Set deceleration

- Deceleration of slow down when dragging released
    ```javascript
    scroller.setSlidingDeceleration(dec);
    ```
    - Disable
        ```javascript
        scroller.setSlidingDeceleration(false);
        ```
- Deceleration of pull back when out of bounds
    ```javascript
    scroller.setBackDeceleration(dec);
    ```
    - Disable
        ```javascript
        scroller.setBackDeceleration(false);
        ```

### Get value

```javascript
var value = scroller.value;
```

### Set value

```javascript
scroller.value = newValue;
// scroller.setValue(newValue);
```

Fires `valuechange` event if new value is not equal to current value.

### Events

- Value changed
    ```javascript
    scroller.on('valuechange', function(newValue, prevValue){ /* ... */ });
    ```
    - Set position of content under this event
- Value out of max/min bound
    ```javascript
    scroller.on('overmax', function(newValue, prevValue){ /* ... */ });
    ```
    ```javascript
    scroller.on('overmin', function(newValue, prevValue){ /* ... */ });
    ```

### Drag

#### Drag enable

```javascript
scroller.setEnable();
// scroller.setEnable(false);  // disable
```

#### Is dragging

```javascript
var isDragging = scroller.isDragging;
```

### State machine

```mermaid
graph TB

IDLE["Idle"] --> |Drag| DRAG["Dragging<br>event 'valuechange'"]
DRAG --> |Release| OnRelease{"Under bounds?"}

OnRelease --> |Yes| SLIDE["Sliding<br>Sliding-deceleration"]
SLIDE --> |Stop| IDLE
SLIDE --> |Drag| DRAG

OnRelease --> |No| BACK["Pull back to bounds<br>Back-deceleration"]
BACK --> |Stop| IDLE
BACK --> |Drag| DRAG
```

- Get state
    ```javascript
    var state = scroller.state;
    ```
    - `'IDLE'` : No dragging, no sliding
    - `'DRAG'` : Dragging
    - `'SLIDE'` : Sliding when dragging released
    - `'BACK'` : Sliding back to bound when out of bound