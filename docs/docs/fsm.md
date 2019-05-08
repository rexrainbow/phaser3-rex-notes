## Introduction

[Finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine).

- Author: Rex
- Object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/fsm-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexfsmplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/fsm)

### New class

#### Import FSM class

```javascript
import FSM from './plugins/fsm.js';
```

#### Create new class

```javascript
class State extends FSM {
    constructor() {
        super();
    }

    next_A() { return 'B' }

    enter_A() { /* ... */ }

    exit_A() { /* ... */ }
}
```

Members:

- `next_` + stateName: Callback to get next state.
- `enter_` + stateName: Callback when enter state.
- `exit_` + stateName: Callback when exit state.

#### Create instance

```javascript
var state = new State();
```

### Create by config

#### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import FSMPlugin from './plugins/fsm-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexFSM',
            plugin: FSMPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

#### Create instance

```javascript
var config = {
    start: 'A',   // default: undefined
    states: {
        A: {
            next: 'B',  // function() { return 'B'; }
            enter: function() {},
            exit: function() {}
        },
        // ...
    },
    init: function() {},
    extend: {
        i: 0,
        name: 'abc'
        // ...
    },
    enable: true,
    eventEmitter: undefined,
}
var state = scene.plugins.get('rexFSM').add(config)
```

- `start`: Initial state.
- `states`: Define states.
    - stateName
        - `next`: String of next state, or a callback to get next state.
        - `enter`: Callback when enter state.
        - `exit`: Callback when exit state.
- `init`: Initial callback when creating instance.
- `extend`: Inject key-value pairs into instance.
- `enable`: Set `false` to block any state changing.
- `eventEmitter`
    - `undefined` : Create a private event emitter, default value.
    - `false` : Don't add any event emitter, i.e. no event will be fired.
    - [Event emitter object](eventemitter3.md) : Fire event through this event emitter.

### Read state

- Current state
    ```javascript
    var curState = state.state;
    ```
- Previous state
    ```javascript
    var preState = state.prevState;
    ```

### Start at state

Set new state without triggering any [state-changing](fsm.md#state-changing) callbacks or events.

```javascript
state.start(newState);
```

### Next state

```mermaid
graph TB

next["state.next()"] --> next_A["state.next_A()<br>return 'B'"]

next_A --> eventStateChange["state.emit('statechange', state)<br>state.prevState -> state.state"]

subgraph State changing

eventStateChange --> exit_A["state.exit_A()"]
exit_A --> eventExitA["state.emit('exit_A', state)"]

eventExitA --> enter_B["state.enter_B()"]
enter_B --> eventEnterB["state.emit('enter_B', state)"]

subgraph Exit
exit_A
eventExitA
end

subgraph Enter
enter_B
eventEnterB
end

end

goto["state.goto('B')"] --> eventStateChange

subgraph Request

subgraph Next
next
next_A
end

subgraph Goto
goto
end

end
```

#### Request

- Get next state by callback
    ```javascript
    state.next();    // nextState = state.next_A()    
    ```
- Goto state
    ```javascript
    state.goto(nextState);
    // state.state = nextState;
    ```

#### State-changing

These callbacks or events will be triggered if state is changing.

For example, state is changing from 'A' to 'B'.

1. event `statechange`
    ```javascript
    state.on('statechange', function(state) {
        console.log( state.prevState + '->' + state.state );
    });
    ```
1. callback `state.exit_A`
1. event `exit_A`
    ```javascript
    state.on('exit_A', function(state) {
        /*...*/
    });
    ```
1. callback `state.enter_B`
1. event `enter_B`
    ```javascript
    state.on('enter_B', function(state) {
        /*...*/
    });
    ```

### Enable

```javascript
state.setEnable();
// state.setEnable(false); // disable
```

`state.next()` and `state.goto()` will be ignored if disabled.