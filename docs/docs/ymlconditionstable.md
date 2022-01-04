## Introduction

Check conditions to find passed tests listed in a [YAML](https://en.wikipedia.org/wiki/YAML) table.

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/yml-conditions-table)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexymlconditionstableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexymlconditionstableplugin.min.js', true);
    ```
- Add conditions-table object
    ```javascript
    var conditionstable = scene.plugins.get('rexymlconditionstableplugin').add();
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ConditionsTablePlugin from 'phaser3-rex-plugins/plugins/ymlconditionstable-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexConditionsTable',
                plugin: ConditionsTablePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add conditions-table object
    ```javascript
    var conditionstable = scene.plugins.get('rexConditionsTable').add();
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ConditionsTable from 'phaser3-rex-plugins/plugins/ymlconditionstable.js';
    ```
- Add conditions-table object
    ```javascript
    var conditionstable = new ConditionsTable();
    ```

### Create instance

```javascript
var table = scene.plugins.get('rexConditionsTable').add();
```

### Load table from YAML string

```javascript
table.loadYML(ymlString);
```

For exameple

```yaml
Test1 : (A >= 10) && (A <= 20)
Test2 : B == 3
```

Equations will be parsed by [expression-parser](expression-parser.md).

### Test

#### Get test results

```javascript
var results = table.getTestResults(context);
```

- `context` : Inputs in Key-value pairs
- `results` : `{name: boolean}`, use OR operation to combine result of tests with the same name.

#### Get first pass test name

```javascript
var testName = table.anyPassTest(context);
```

- `context` : Inputs in Key-value pairs