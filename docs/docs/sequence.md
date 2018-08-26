## Introduction

Run sequence commands in array.

- Author: Rex
- Object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/sequence-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexsequenceplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/run-sequence)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import Sequence from './plugins/sequence.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import SequencePlugin from './plugins/sequence-plugin.js';

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

### Create sequence instance

```javascript
var seq = this.plugins.get('rexSequence').add({
    // yoyo: false  // reverse sequence when it reaches the end
    // repeat: 0,   // repeat count
    // loop: false  // repeat forever
});
```

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

Format of command is the same as [run-command](runcommands#run-commands).

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

### Events

- On sequence completed :

```javascript
seq.on('complete', function(seq){});
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