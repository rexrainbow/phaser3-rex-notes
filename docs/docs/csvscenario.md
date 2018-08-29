## Introduction

Run script in csv format. Csv could be edited by excel or google document.

- Author: Rex
- Member of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/csvscenario-plugin.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/csv-scenario)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexCSVScenario from './plugins/csvscenario.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import CSVScenarioPlugin from './plugins/csvscenario-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCSVScenario',
            plugin: CSVScenarioPlugin,
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
var scenario = scene.plugins.get('rexCSVScenario').add(scene);
```

### Load csv script

```javascript
scenario.load(csvString, scope, {
    // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
    // prefix: /^#([a-zA-Z]+)/
    // argsConvert: true,
    // argsConvertScope: undefined
})
```

- timeUnit: time-unit of dt, for [delay-execution](csvscenario.md#delay-execution)
    - `'ms'`, or `0` : dt in millisecond
    - `'s'`, `'sec'`, or 1 : dt in second
- prefix: regex of picking control instructions
- argsConvert: a callback to convert parameters of [run-custom-function](csvscenario.md#run-custom-function), or `true` to use default convert function
- argsConvertScope: scope of argsConvert

### Start running instructions

```javascript
scenario.start({
    // label: '',
    // offset: 0
})
```

- `label` : Go to the label and execute. '' label is starting from 1st instruction
- `offset` : Offset time

### Events

- Complete
    ```javascript
    scenario.on('complete', function(scenario){});
    ```
- Label has changed
    ```javascript
    scenario.on('labelchange', function(){});
    ```    
- Dump execution log
    ```javascript
    scenario.on('log', function(){});
    ```
- Notify error
    ```javascript
    scenario.on('error', function(){});
    ```

### Types of instructions

Each row in csv table is an instruction.

#### Run custom function

Run custom function of `scope`, which passed from `scenario.load(...)`

Format:

```raw
-,fnName,param0,param1,...
```

- 1st column of instruction: `-`
- Parameters will be converted to number, boolean, null, or string by default.

##### Delay execution

Run custom function after a delay.

Format:

```raw
time,fnName,param0,param1,...
```

- 1st column of instruction: a number
- time-unit of delay is set from `scenario.load(...)`
- Parameters will be converted to number, boolean, null, or string by default.

##### Wait then execution

Run custom function until `scenario.continue(eventName)`

Format:

```raw
eventName,fnName,param0,param1,...
```

- 1st column of instruction: not a number, not a string start from `#`
- Execution will be hang until `scenario.continue(eventName)` is called
- Parameters will be converted to number, boolean, null, or string by default.

##### Task

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/csv-scenario/task.js)

Scenario will be paused if custom function return an [event emitter](eventemitter3.md), resumed when that evnt emitter fires `complete` event.

See also: [Sequence](sequence.md#action-of-commands)

#### Label

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/csv-scenario/label-exit.js)

A label for `#GOTO` or `#IF` instructions.

Format:

```raw
#LABEL,label
```

- 1st column of instruction: `#LABEL`, case insensitive.
- Label `''` is reserved, don't use `''` for label name.

Example: A label named 'AA'

```raw
#LABEL,AA
```

#### Exit

Exit current execution.

Format:

```raw
#EXIT
```

- 1st column of instruction: `#EXIT`, case insensitive.

#### Goto

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/csv-scenario/goto.js)

Go to *label* and execute.

Format:

```raw
#GOTO,label
```

- 1st column of instruction: `#GOTO`, case insensitive.
- An `error` event will be fired if label is not found.

Example: Goto label 'AA'

```raw
#GOTO,AA
```

#### If-goto

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/csv-scenario/if.js)

Go to *trueLabel* if condition is true, otherwise go to *falseLabel*.

Format:

```raw
#IF,condition,trueLabel,falseLabel
```

- 1st column of instruction: `#IF`, case insensitive.
- conditon: boolean equation
    - *this* is the `scope` passed from `scenario.load(...)`
- trueLabel/falseLabel: go to this label if condition is true/false
    - run next instruction if label is `''`
    - An `error` event will be fired if label is not found.

Example: Goto label 'AA' if (this.coin > 100), else run next instruction

```raw
#IF,this.coin > 100,AA
```

#### Wait

Run next instruction after a delay time, or `scenario.continue(eventName)`.

Format:

```raw
#WAIT,time
```

```raw
#WAIT,eventName
```

- 1st column of instruction: `#WAIT`, case insensitive.
- 2nd colume of instruction:
    - a number: a delay time
        - time-unit of delay is set from `scenario.load(...)`
    - a string: an event name for `scenario.continue(eventName)`

Example: 

- Wait 1 time-unit
    ```raw
    #WAIT,1
    ```
- Wait until 'click'
    ```raw
    #WAIT,click
    ```
    ```javascript
    scenario.continue('click')
    ```

### Other methods

#### Pause

```javascript
scenario.pause()
```

#### Resume

```javascript
scenario.resume()
```
