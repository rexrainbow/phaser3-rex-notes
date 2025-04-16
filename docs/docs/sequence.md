## Introduction

Run sequence commands in array.

- Author: Rex
- Object

## Live demos

- [Sequence](https://codepen.io/rexrainbow/pen/vjPpQa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/run-sequence)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexsequenceplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsequenceplugin.min.js', true);
    ```
- Create sequence instance
    ```javascript
    var seq = this.plugins.get('rexsequenceplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SequencePlugin from 'phaser3-rex-plugins/plugins/sequence-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSequence',
                plugin: SequencePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Create sequence instance
    ```javascript
    var seq = this.plugins.get('rexSequence').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Sequence from 'phaser3-rex-plugins/plugins/sequence.js';
    ```
- Create sequence instance
    ```javascript
    var seq = new Sequence(config);
    ```

### Create sequence instance

```javascript
var seq = this.plugins.get('rexSequence').add({
    // yoyo: false,
    // repeat: 0, 
    // loop: false
});
```

- `yoyo` : Reverse sequence when it reaches the end
- `repeat` : Repeat count
- `loop` : Repeat forever

### Load commands

```javascript
seq.load(commands, actionScope);
```

- Format of command :
    ```javascript
    [fnName, param0, param1, ...]
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
- [ActionScope](sequence.md#action-of-commands)

Format of command is the same as [run-command](runcommands.md).

### Run commands

```javascript
seq.start();
```

- Run command :
    ```javascript
    var eventEmitter = actionScope[fnName].call(actionScope, param0, param1 ...);
    ```
    - Return an [event emitter](eventemitter3.md) to pause the sequence, otherwise run next command  
    - Sequence will continue when that event emitter fires `complete` event

### Stop

```javascript
seq.stop();
```

### Events

- On sequence completed :
    ```javascript
    seq.on('complete', function(actionScope, seq){ 
        
    });
    ```

### Action of commands

Action of commands, extended from `Phaser.Events.EventEmitter`.

```javascript
class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();

        this.scene = scene;
        this.myConsole = scene.add.text(100, 100, '');

        this['wait-click'] = this.waitClick;
        this['wait-time'] = this.waitTime;
    }

    // callbacks
    print(msg) {
        this.myConsole.setText(msg);
        // return undefined to run next command
    }

    waitClick() {
        this.scene.input.once('pointerup', this.complete, this);
        return this;  // return eventEmitter to pause the sequence
    }

    waitTime(delay) {
        this.scene.time.delayedCall(delay * 1000, this.complete, [], this);
        return this;  // return eventEmitter to pause the sequence
    }

    complete() {
        this.emit('complete');  // resume sequence
    }
}
var actionScope = new ActionKlass(scene);
```

Now this scope supports 3 commands

- print(msg): `['print', msg]`
- waitClick(): `['wait-click']`
- waitTime(delay): `['wait-time', delay]`

### State

```javascript
var state = seq.state;
```

- `0` : Idle
- `1` : Run
- `2` : Last command
- `3` : Completed


```javascript
var completed = seq.completed; // seq.state === 3
```

### Other properties

- Yoyo
    - Get
        ```javascript
        var yoyo = seq.yoyo;
        ```
    - Set
        ```javascript
        seq.setYoyo();
        seq.setYoyo(fals);
        // seq.yoyo = yoyo;
        ```
- Repeat
    - Get
        ```javascript
        var repeat = seq.repeat;
        ```
    - Set
        ```javascript
        seq.setRepeat(count);
        ```
- Loop
    - Get
        ```javascript
        var loop = seq.loop;
        ```
    - Set
        ```javascript
        seq.setLoop();
        seq.setLoop(fals);
        // seq.loop = loop;
        ```