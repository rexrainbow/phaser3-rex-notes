## Introduction

Get image data from texture, or text object.

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/canvasdata-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcanvasdataplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/canvasdata)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexCanvasData from './plugins/canvasdata.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import CanvasDataPlugin from './plugins/canvasdata-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCanvasData',
            plugin: CanvasDataPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Convert csv

```javascript
var arr = scene.plugins.get('rexCanvasData').convert(csvString, {
    // delimiter: ',',
    // convert: true
});
```

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`.