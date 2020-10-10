## Introduction

Run commands in array.

- Author: Rex
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/run-commands)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexruncommandsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexruncommandsplugin.min.js', true);
    ```
- Run commands
    ```javascript
    scene.plugins.get('rexruncommandsplugin').run(commands, scope);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RunCommandsPlugin from 'phaser3-rex-plugins/plugins/runcommands-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRunCommands',
                plugin: RunCommandsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Run commands
    ```javascript
    scene.plugins.get('rexRunCommands').run(commands, scope);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RunCommands from 'phaser3-rex-plugins/plugins/runcommands.js';
    ```
- Run commands
    ```javascript
    RunCommands(commands, scope);
    ```

### Run commands

```javascript
scene.plugins.get('rexRunCommands').run(commands, scope);
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