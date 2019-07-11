## Introduction

Run commands in array.

- Author: Rex
- Method only

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/runcommands/RunCommands.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/run-commands)

### Run commands

```javascript
runCommands(commands, scope);
```

- Format of command :
    ```javascript
    [fnName, param0, param1, ...]
    ```
    or
    ```javascript
    [callback, param0, param1, ...]
    ```
- Commands in nested array :
    ```javascript
    [
        command0,
        command1
        [
            command2,
            command3
        ]
    ]
    ```
- Run command :
    ```javascript
    scope[fnName].call(scope, param0, param1 ...)
    ```
    or
    ```javascript
    callback.call(scope, param0, param1 ...)
    ```