## Introduction

[Finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine).

- Author: Rex
- Object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/fsm)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfsmplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfsmplugin.min.js', true);
    ```
- Add FSM object
    ```javascript
    var states = scene.plugins.get('rexfsmplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FSMPlugin from 'phaser3-rex-plugins/plugins/fsm-plugin.js';
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
- Add FSM object
    ```javascript
    var states = scene.plugins.get('rexFSM').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import FSM from 'phaser3-rex-plugins/plugins/fsm.js';
    ```
- Add FSM object
    ```javascript
    var states = new FSM(config);
    ```

### Create instance

#### Create by config

```javascript
var states = scene.plugins.get('rexFSM').add({
    start: 'A',   // default: undefined
    states: {
        A: {
            next: 'B',  // function() { return 'B'; }
            enter: function() {},                 // this: this fsm instance
            exit: function() {},                  // this: this fsm instance
            update: function(time, delta) {},     // this: this fsm instance
            preupdate: function(time, delta) {},  // this: this fsm instance
            postupdate: function(time, delta) {}, // this: this fsm instance
        },
        // ...
    },
    init: function() {},   // this: this fsm instance
    extend: {
        i: 0,        // Add member `i` into this fsm instance
        name: 'abc'
        // ...
    },
    enable: true,
    scene: undefined,
    eventEmitter: undefined
});
```

- `start`: Initial state.
- `states`: Define states.
    - stateName
        - `next`: String of next state, or a callback to get next state.
        - `enter`: Callback when enter state.
            ```javascript
            function() {
                // this : this fsm instance
            }
            ``` 
        - `exit`: Callback when exit state.
             ```javascript
            function() {
                // this : this fsm instance
            }
            ``` 
        - `update`, `preupdate`, `postupdate` : Callback invoked by [scene's `'update'`, `'preupdate'`, `'postupdate'` events](scene.md#events).
            ```javascript
            function(time, delta) {
                // this : this fsm instance
            }
            ``` 
- `init`: Initial callback when creating instance.
    ```javascript
    function() {
        // this : this fsm instance
    }
    ``` 
- `extend`: Inject key-value pairs into this fsm instance.
- `enable`: Set `false` to block any state changing.
- `scene` : [Scene object](scene.md) for [*startUpdate*, *startPreUpdate*, *startPostUpdate* method](fsm.md#update). Optional.
- `eventEmitter`
    - `undefined` : Create a private event emitter, default value.
    - `false` : Don't add any event emitter, i.e. no event will be fired.
    - [Event emitter object](eventemitter3.md) : Fire event through this event emitter.

#### Inheritance

1. Create new class
    ```javascript
    class State extends FSM {
        constructor() {
            super();
        }
    
        next_A() { return 'B' }
    
        enter_A() { }
    
        exit_A() { }

        update_A(time, delta) { }
        preupdate_A(time, delta) { }
        postupdate_A(time, delta) { }
    }
    ```
    Members:
        - `next_` + stateName : Callback to get next state.
        - `enter_` + stateName : Callback when enter state.
        - `exit_` + stateName : Callback when exit state.
        - `update_` + stateName, `preupdate_` + stateName, `postupdate_` + stateName : Callback invoked by [scene's `'update'`, `'preupdate'`, `'postupdate'` events](scene.md#events).
1. Create instance
    ```javascript
    var states = new State();
    ```

### Read state

- Current state
    ```javascript
    var curState = states.state;
    ```
- Previous state
    ```javascript
    var preState = states.prevState;
    ```

### Start at state

```javascript
states.start(newState);
```

!!! note
    Set new state without triggering any [state-changing](fsm.md#state-changing) callbacks or events.

### Next state

```mermaid
graph TB

next["states.next()"] --> next_A["states.next_A()<br>return 'B'"]

next_A --> eventStateChange["states.emit('statechange', states)<br>states.prevState -> states.state"]

subgraph State changing

eventStateChange --> exit_A["states.exit_A()"]
exit_A --> eventExitA["states.emit('exit_A', states)"]

eventExitA --> enter_B["states.enter_B()"]
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
    states.next();    // nextState = states.next_A()    
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
1. callback `states.exit_A`
1. event `exit_A`
    ```javascript
    states.on('exit_A', function(states) {
        /*...*/
    });
    ```
1. callback `states.enter_B`
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

### Update

- Start
    ```javascript
    states.startUpdate();
    states.startPreUpdate();
    states.startPostUpdate();
    // Assume that `scene` is assigned in config of constructor
    ```
    or
    ```javascript
    states.startUpdate(scene);
    states.startPreUpdate(scene);
    states.startPostUpdate(scene);
    ```
    - `scene` : [Scene object](scene.md)
- Stop
    ```javascript
    states.stopUpdate();
    states.stopPreUpdate();
    states.stopPostUpdate();
    ```

### Add new state

```javascript
states.addState(name, {
    next: 'B',  // function() { return 'B'; }
    enter: function() {},
    exit: function() {},
    update: function(time, delta) {},
    preupdate: function(time, delta) {},
    postupdate: function(time, delta) {},
})
```
```javascript
states.addState({
    name: 'A',
    next: 'B',  // function() { return 'B'; }
    enter: function() {},
    exit: function() {},
    update: function(time, delta) {},
    preupdate: function(time, delta) {},
    postupdate: function(time, delta) {},
})
```

or

```javascript
states.addStates({
    'A' : {
        next: 'B',  // function() { return 'B'; }
        enter: function() {},
        exit: function() {},
        update: function(time, delta) {},
        preupdate: function(time, delta) {},
        postupdate: function(time, delta) {},
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
        exit: function() {},
        update: function(time, delta) {},
        preupdate: function(time, delta) {},
        postupdate: function(time, delta) {},
    },
    // ...
]);
```