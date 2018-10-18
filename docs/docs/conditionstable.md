## Introduction

Check conditions to find passed tests listed in a csv table.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/conditionstable-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexconditionstableplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/conditions-table)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexConditionsTable from './plugins/conditionstable.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import ConditionsTablePlugin from './plugins/conditionstable-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexConditionsTable',
            plugin: ConditionsTablePlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
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