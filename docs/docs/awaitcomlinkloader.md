## Introduction

Running web worker by using [Comlink](https://github.com/GoogleChromeLabs/comlink) in preload stage.

- Author: Rex
- Custom File of loader

## Live demos

- [Worker file in external url](https://codepen.io/rexrainbow/pen/gbbWwQm)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/awaitcomlinkloader)

### Install Comlink

Comlink API is not included in this plugin.

#### Load by script tag

```html
<script src="https://unpkg.com/comlink/dist/umd/comlink.js"></script>
```

#### Load by scene

```js
var config = {
    key: '...',
    pack: {
        files: [
            {
                'type': 'script',
                'key': 'comlink',
                'url': 'https://unpkg.com/comlink/dist/umd/comlink.js'
            },
        ]
    }
}
```

#### Lazy load

Plugin will load Comlink API if Comlink API is not ready.


### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    var sceneConfig = {
        // ....
        pack: {
            files: [
                // Also load Comlink API
                // {
                //     'type': 'script',
                //     'key': 'comlink',
                //     'url': 'https://unpkg.com/comlink/dist/umd/comlink.js'
                // },
                {
                    type: 'plugin',
                    key: 'rexawaitcomlinkloaderplugin',
                    url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/    rexawaitcomlinkloaderplugin.min.js',
                    start: true
                }
            ]
        }
    };
    class MyScene extends Phaser.Scene {
        constructor() {
            super(sceneConfig)
        }
        // ....

        preload() {
            // rexawaitloaderplugin will be installed before preload(), but not added to loader yet
            // Call addToScene(scene) to add this await loader to loader of this scene
            this.plugins.get('rexawaitloaderplugin').addToScene(this);

            this.load.rexAwaitComlink({
                // ...
            });
        }
    }
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import AwaitComlinkLoaderPlugin from 'phaser3-rex-plugins/plugins/awaitcomlinkloader-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexAwaitComlinkLoader',
                plugin: AwaitComlinkLoaderPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- In preload stage, start web-worker task
    ```javascript
    scene.load.rexAwaitComlink({
        // ...
    });
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import AwaitComLinkLoader from 'phaser3-rex-plugins/plugins/awaitcomlinkloader.js';
    ```
- In preload stage, start web-worker task
    ```javascript
    AwaitComLinkLoader.call(scene.load, {
        // ...
    })
    ```

### Start web-worker task

#### Worker file URL

In preload stage:

```javascript
scene.load.rexAwaitComlink({
    // comlink: 'https://unpkg.com/comlink/dist/umd/comlink.js',

    workerFilePath: undefined,
    data: undefined,

    // onBegin(data) { /*...*/ },
    // onBeforeWorker(data) { /*...*/ },
    // onAfterWorker(data) { /*...*/ },
    // onEnd(data) { /*...*/ },

});
```

- `comlink` : URL of Comlink API, load Comlink API if it has not been ready yet.
    - `undefined` : Using default value , `'https://unpkg.com/comlink/dist/umd/comlink.js'`
- `workerFilePath` : URL of user worker file.
- `data` : User-defined data that will be passed to other callbacks.
- `onBegin` : Callback invoked befor running worker thread, in main thread.
    ```javascript
    onBegin(data) {
        // return data;
    }
    ```
    or
    ```javascript
    async onBegin(data) {
        // return data;
    }
    ```
    - Return value will be passed to worker task.
        - `undefined` : Bypass data to worker task.
- `onBeforeWorker` : Proxy callback for inovking in worker thread. Implemented in [worker code](#worker-code).
    ```javascript
    onBeforeWorker(data) {
        // return data;
    }
    ```
    or
    ```javascript
    async onBeforeWorker(data) {
        // return data;
    }
    ```
    - Return value will be passed to worker task.
        - `undefined` : Bypass data to worker task.
- `onAfterWorker` : Proxy callback for inovking in worker thread. Implemented in [worker code](#worker-code).
    ```javascript
    onAfterWorker(data) {
        // return data;
    }
    ```
    or
    ```javascript
    async onAfterWorker(data) {
        // return data;
    }
    ```
    - Return value will be passed to worker task.
        - `undefined` : Bypass data to worker task.
- `onEnd` : Callback invoked after running worker thread, in main thread.
    ```javascript
    onEnd(data) {
        // return false;
    }
    ```
    or
    ```javascript
    async onEnd(data) {
        // return false;
    }
    ```
    - Return value
        - `false` : Simulate loading failled.
        - Others : Simulate loading Success.

##### Worker code

Sample code of worker file.

```javascript
importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');
(() => {
    async function run(data, onBefore, onEnd) {
        var newData;
        if (onBefore) {
            newData = await onBefore(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        // worker logic...

        if (onEnd) {
            newData = await onEnd(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        return data;
    }

    Comlink.expose(run);
})();
```


#### Worker code string

In preload stage:

```javascript
scene.load.rexAwaitComlink({
    // comlink: 'https://unpkg.com/comlink/dist/umd/comlink.js',

    workerCode: workerCode
    data: undefined,

    // onBegin(data) { /*...*/ },
    // onBeforeWorker(data) { /*...*/ },
    // onAfterWorker(data) { /*...*/ },
    // onEnd(data) { /*...*/ },

});
```

- `workerCode` : Worker code in string format. [Reference](#worker-code)
    - `undefined` : Use [default worker code](#default-worker-code)

Note that `workerFilePath` is not given (`undefined`) in this use case.

##### Default worker code

```js
importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');
(() => {
    async function run(data, onBefore, onEnd) {
        var newData;
        if (onBefore) {
            newData = await onBefore(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (onEnd) {
            newData = await onEnd(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        return data;
    }
    Comlink.expose(run);
})();
```

#### Callback in main thread

In preload stage:

```javascript
scene.load.rexAwaitComlink({
    // comlink: 'https://unpkg.com/comlink/dist/umd/comlink.js',

    data: undefined,

    // onBegin(data) { /*...*/ },
    onBeforeWorker(data) { /*...*/ },
    // onAfterWorker(data) { /*...*/ },
    // onEnd(data) { /*...*/ },

});
```

`workerFilePath` and `workerCode` are not given, will use [default worker code](#default-worker-code),
which will run `onBeforeWorker` and `onAfterWorker` callback passed from main thread.