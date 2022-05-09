## Introduction

Generate array from csv string.

- Reference: [Papa Parse](https://www.papaparse.com/)
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/csv-to-array)

### Import class

```javascript
import rexCSVToArray from './plugins/csvtoarray.js';
```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import AwayTimePlugin from 'phaser3-rex-plugins/plugins/awaytime-plugin.js';
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
- Convert csv
    ```javascript
    var arr = scene.plugins.get('rexCSVToArray').convert(csvString, config);
    ```

### Convert csv

```javascript
var arr = scene.plugins.get('rexCSVToArray').convert(csvString, {
    // delimiter: ',',
    // convert: true
});
```

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`.