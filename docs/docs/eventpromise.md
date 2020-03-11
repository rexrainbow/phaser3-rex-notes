## Introduction

Return a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of an event.

- Author: Rex
- Method only

## Live demos

- [Wait complete](https://codepen.io/rexrainbow/pen/jOPZqbr)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/event-promise)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexeventpromiseplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexeventpromiseplugin.min.js', true);
    ```
- Get event promise
    ```javascript
    var promoise = scene.plugins.get('rexeventpromiseplugin').waitEvent(eventEmitter, eventName);
    // var promoise = scene.plugins.get('rexeventpromiseplugin').waitComplete(eventEmitter);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import EventPromisePlugin from 'phaser3-rex-plugins/plugins/eventpromise-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexEventPromise',
                plugin: EventPromisePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Get event promise
    ```javascript
    var promoise = scene.plugins.get('rexEventPromise').waitEvent(eventEmitter, eventName);
    // var promoise = scene.plugins.get('rexEventPromise').waitComplete(eventEmitter);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { WaitEvent, WaitComplete } from 'phaser3-rex-plugins/plugins/eventpromise.js';
    ```
- Get event promise
    ```javascript
    var promoise = WaitEvent(eventEmitter, eventName);
    // var promoise = WaitComplete(eventEmitter);
    ```

### Get event promise

```javascript
var promoise = scene.plugins.get('rexEventPromise').waitEvent(eventEmitter, eventName)
    .then(function() {

    })
```

- `eventEmitter` : Any kind of [event emitter](eventemitter3.md). for example, game object, or [tween task](tween.md#events), or [scene event](scene.md#events)

### Get complete event promise

```javascript
var promoise = scene.plugins.get('rexEventPromise').waitComplete(eventEmitter)
    .then(function() {
        
    })
```

- `eventEmitter` : [Event emitter](eventemitter3.md) which will fire `'complete'` event, for example, [tween task](tween.md#events).