## Introduction

Another version of [Finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine).

- Author: Rex
- Object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/statemanager)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexstatemanagerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexstatemanagerplugin.min.js', true);
    ```
- Add StateManager object
    ```javascript
    var states = scene.plugins.get('rexstatemanagerplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import StateManagerPlugin from 'phaser3-rex-plugins/plugins/statemanager-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexStateManager',
                plugin: StateManagerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add StateManager object
    ```javascript
    var states = scene.plugins.get('rexStateManager').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import StateManager from 'phaser3-rex-plugins/plugins/statemanager.js';
    ```
- Add StateManager object
    ```javascript
    var states = new StateManager(config);
    ```

### Create instance

```javascript
var states = scene.plugins.get('rexStateManager').add({
    eventEmitter: undefined
});
```

- `eventEmitter`
    - `undefined` : Create a private event emitter, default value.
    - `false` : Don't add any event emitter, i.e. no event will be fired.
    - [Event emitter object](eventemitter3.md) : Fire event through this event emitter.

### Custom class

- Define class
    ```javascript
    class MyStates extends StateManager {
        constructor(config) {
            super(config);

            this.addStates({
                A: {
                    next: 'B',  // function() { return 'B'; }
                    enter: function() {},
                    exit: function() {}
                },
                // ...
            });
        }
    }
    ```
- Create instance
    ```javascript
    var states = new MyStates(config);
    ```

### Add new state

```javascript
states.addState(name, {
    next: 'B',  // function() { return 'B'; }
    enter: function() {},
    exit: function() {}
})
```
```javascript
states.addState({
    name: 'A',
    next: 'B',  // function() { return 'B'; }
    enter: function() {},
    exit: function() {}
})
```

or

```javascript
states.addStates({
    'A' : {
        next: 'B',  // function() { return 'B'; }
        enter: function() {},
        exit: function() {}
    },
    // ...
})
```
```javascript
states.addStates([
    {
        name: 'A',
        next: 'B',  // function() { return 'B'; }
        enter: function() {},
        exit: function() {}
    },
    // ...
]);
```

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

Set new state without triggering any [state-changing](statemanager.md#state-changing) callbacks or events.

```javascript
state.start(newState);
```

### Next state

```mermaid
graph TB

next["states.next()"] --> next_A["stateA.next()<br>return 'B'"]

next_A --> eventStateChange["states.emit('statechange', states)<br>states.prevState -> states.state"]

subgraph State changing

eventStateChange --> exit_A["stateA.exit()"]
exit_A --> eventExitA["states.emit('exit_A', states)"]

eventExitA --> enter_B["stateB.enter()"]
enter_B --> eventEnterB["states.emit('enter_B', states)"]

subgraph Exit
exit_A
eventExitA
end

subgraph Enter
enter_B
eventEnterB
end

end

goto["states.goto('B')"] --> eventStateChange

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
    states.next();    // nextState = stateA.next()    
    ```
- Goto state
    ```javascript
    states.goto(nextState);
    // states.state = nextState;
    ```

#### State-changing

These callbacks or events will be triggered if state is changing.

For example, state is changing from 'A' to 'B'.

1. event `statechange`
    ```javascript
    states.on('statechange', function(states) {
        console.log( states.prevState + '->' + states.state );
    });
    ```
1. callback `stateA.exit`
1. event `exit_A`
    ```javascript
    states.on('exit_A', function(states) {
        /*...*/
    });
    ```
1. callback `stateB.enter`
1. event `enter_B`
    ```javascript
    states.on('enter_B', function(states) {
        /*...*/
    });
    ```

### Enable

```javascript
states.setEnable();
// states.setEnable(false); // disable
```

or

```javascript
states.toggleEnable();
```

`states.next()` and `states.goto()` will be ignored if disabled.
