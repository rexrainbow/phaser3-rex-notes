## Introduction

Wait fired events or callbacks.

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/waitevents)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexwaiteventsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwaiteventsplugin.min.js', true);
    ```
- Create instance
    ```javascript
    var waitEvents = scene.plugins.get('rexwaiteventsplugin').add(completeCallback, completeCallbackScope);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import WaitEventsPlugin from 'phaser3-rex-plugins/plugins/waitevents-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexWaitEvents',
                plugin: WaitEventsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Create instance
    ```javascript
    var waitEvents = scene.plugins.get('rexWaitEvents').add(completeCallback, completeCallbackScope);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import WaitEvents from 'phaser3-rex-plugins/plugins/waitevents.js';
    ```
- Create instance
    ```javascript
    var waitEvents = new WaitEvents(completeCallback, completeCallbackScope);
    ```

### Create instance

```javascript
var waitEvents = scene.plugins.get('rexWaitEvents').add(completeCallback, completeCallbackScope);
```

- `completeCallback`, `completeCallbackScope` : Callback when all waitting events are fired.

### Set complete callback

```javascript
waitEvents.setCompleteCallback(completeCallback, completeCallbackScope);
```

- `completeCallback`, `completeCallbackScope` : Callback when all waitting events are fired.

### Add waiting event

#### Callback

```javascript
var callback = waitEvents.waitCallback();
```

- `callback` : A function object which invoked when waitting event finished.

For example, invokes `completeCallback` when all timers are time-out.

```javascript
scene.time.delayedCall(500, waitEvents.waitCallback());
scene.time.delayedCall(1000, waitEvents.waitCallback());
scene.time.delayedCall(1500, waitEvents.waitCallback());
```

#### Callback from event emitter

```javascript
waitEvents.waitEvent(eventEmitter, eventName);
```

### Remove waiting event

```javascript
callback();
```

or 

```javascript
waitEvents.remove(callback);
```

- `callback` : A function object created via `waitEvents.waitCallback()`

### Clear all waiting events

```javascript
waitEvents.clear();
```

#### No wait event

```javascript
var noWaitEvent = waitEvents.noWaitEvent;
```