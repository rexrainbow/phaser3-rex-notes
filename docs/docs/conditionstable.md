## Introduction

Check conditions to find passed tests listed in a csv table.

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/conditions-table)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexconditionstableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexconditionstableplugin.min.js', true);
    ```
- Add conditions-table object
    ```javascript
    var conditionstable = scene.plugins.get('rexconditionstableplugin').add();
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ConditionsTablePlugin from 'phaser3-rex-plugins/plugins/conditionstable-plugin.js';
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
    import ConditionsTable from 'phaser3-rex-plugins/plugins/conditionstable.js';
    ```
- Add conditions-table object
    ```javascript
    var conditionstable = new ConditionsTable();
    ```

### Create instance

```javascript
var table = scene.plugins.get('rexConditionsTable').add();
```

### Load table from csv string

```javascript
table.loadCSV(csvString, {
    // delimiter: ','
});
```

For exameple, csv string

|name |A    |A    |B |
|-----|-----|-----|--|
|Test1|>= 10|<= 20|  |
|Test2|     |     |3 |

```raw
,A,A,B
Test1,>= 10,<= 20,
Test2,,,3
```

means that:

```raw
Test1: (A>=10) && (A<=20)
Test2: (B==3)
```

### Test

#### Get test results

```javascript
var results = table.getTestResults(values);
```

- `values` : Inputs in Key-value pairs
- `results` : `{name: boolean}`, use OR operation to combine result of tests with the same name.

#### Get first pass test name

```javascript
table.anyPassTest(values, function(testName){

}, scope);
```

- `values` : Inputs in Key-value pairs

or

```javascript
var testName = table.anyPassTest(values);
```

#### Get each pass test name

```javascript
table.eachPassTest(values, function(testName){

}, scope);
```

#### Get result of each test

```javascript
table.eachTest(values, function(testName, result){

}, scope);
```