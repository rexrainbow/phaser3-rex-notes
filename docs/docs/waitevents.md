## Introduction

Wait fired events or callbacks.

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/waitevents-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexwaiteventsplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/waitevents)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexWaitEvents from './plugins/waitevents.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import WaitEventsPlugin from './plugins/waitevents-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexWaitEvents',
            plugin: WaitEventsPlugin,
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
var waitevents = scene.plugins.get('rexWaitEvents').add(completeCallback, completeCallbackScope);
```

- `completeCallback`, `completeCallbackScope` : Callback when all waitting events are fired.

### Set complete callback

```javascript
waitevents.setCompleteCallback(completeCallback, completeCallbackScope);
```

- `completeCallback`, `completeCallbackScope` : Callback when all waitting events are fired.

### Add waiting event

#### Callback

```javascript
var callback = waitevents.waitCallback();
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
waitevents.waitEvent(eventEmitter, eventName);
```