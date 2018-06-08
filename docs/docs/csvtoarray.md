## Introduction

Generate array from csv string.

- Author: [Ben](http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm)
- Method only

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/csvtoarray-plugin.js)

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
    // convert: true,
    // convertScope: undefined
});
```

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`, or assign your convert function by `convert` and `convertScope`.