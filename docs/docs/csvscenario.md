## Introduction

Run script in csv format. Csv could be edited by excel or google document.

- Author: Rex
- Member of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/clock/ClockPlugin.js)

## Usage

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
})
```

Properties

- timeUnit: time-unit of dt, for [delay-execution](csvscenario.md#delay-execution)
    - `'ms'`, or `0` : dt in millisecond
    - `'s'`, `'sec'`, or 1 : dt in second
- prefix: regex of picking control instructions

### Start running instructions

```javascript
scenario.start({
    // label: '',
    // offset: 0
})
```

Properties

- label: Go to the label and execute. '' label is starting from 1st instruction
- offset: Offset time

### Events

- Complete
    ```javascript
    scenario.on('complete', function(){});
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

```
-,fnName,param0,param1,...
```

- 1st column of instruction: `-`

##### Wait until complete

##### Delay execution

Run custom function after a delay.

Format:

```
time,fnName,param0,param1,...
```

- 1st column of instruction: a number
- time-unit of delay is passed from `scenario.load(...)`

##### Wait then execution

Run custom function until `scenario.continue(eventName)`

Format:

```
eventName,fnName,param0,param1,...
```

- 1st column of instruction: not a number
- Execution will be hang until `scenario.continue(eventName)` is called

#### Label

A label for `#GOTO` or `#IF` instructions.

Format:

```
#LABEL,label
```

- 1st column of instruction: `#LABEL`, case insensitive.
- Label `''` is reserved, don't use `''` for label name.

Example: A label named 'AA'

```
#LABEL,AA
```

#### Exit

Exit current execution.

Format:

```
#EXIT
```

- 1st column of instruction: `#EXIT`, case insensitive.

#### Goto

Go to *label* and execute.

Format:

```
#GOTO,label
```

- 1st column of instruction: `#GOTO`, case insensitive.
- An `error` event will be fired if label is not found.

Example: Goto label 'AA'

```
#GOTO,AA
```

#### If-goto

Go to *trueLabel* if condition is true, otherwise go to *falseLabel*.

Format:

```
#IF,condition,trueLabel,falseLabel
```

- 1st column of instruction: `#IF`, case insensitive.
- conditon: boolean equation
    - *this* is the `scope` passed from `scenario.load(...)`
- trueLabel/falseLabel: go to this label if condition is true/false
    - run next instruction if label is `''`
    - An `error` event will be fired if label is not found.

Example: Goto label 'AA' if (this.coin > 100), else run next instruction

```
#IF,this.coin > 100,AA
```

### Wait time

Format:

```
#WAITTIME,time
```

### Wait event

```
#WAITEVENT,eventName
```

### Wait

Format:

```
#WAIT,time
```

```
#WAIT,eventName
```
