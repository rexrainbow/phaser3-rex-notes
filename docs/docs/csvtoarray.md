## Introduction

Generate array from csv string.

- Reference: [Papa Parse](https://www.papaparse.com/)
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/csvtoarray-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcsvtoarrayplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/csv-to-array)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexCSVToArray from './plugins/csvtoarray.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import CSVToArrayPlugin from './plugins/csvtoarray-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCSVToArray',
            plugin: CSVToArrayPlugin,
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
var arr = scene.plugins.get('rexCSVToArray').convert(csvString, {
    // delimiter: ',',
    // convert: true
});
```

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`.