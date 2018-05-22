## Introduction

Plugin system, built-in system of phaser.

- Author: Richard Davey

## Usage

### Global plugin

#### Load plugin in [game configuration](game.md#configuration)

```javascript
// import pluginKlass from '...';
var config = {
    // ...
    plugins: {
        global: [
            {
                key: key,
                plugin: pluginKlass,
                start: true             // create instance from pluginKlass
                // mapping: memberName  // member name in each scene instance, optional
            },
            // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

#### Load plugin in scene

```javascript
var pluginInst = scene.plugins.install(key, pluginKlass, true);  // creates instacne then calls start()
```

#### Load and add plugin from file

```javascript
scene.load.plugin(key, url, true);
```

1. load file from url
1. Create instance : `new winodw[key](pluginManager)`
1. Put instance in `plugins[key]`

#### Load plugin from file

```javascript
scene.load.plugin(key, url);
```

#### Get instance

```javascript
var pluginInst = scene.plugins.get(key);
```

### Scene plugin

#### Load plugin in [game configuration](game.md#configuration)

```javascript
// import pluginKlass from '...';
var config = {
    // ...
    plugins: {
        scene: [
            {
                key: key,
                plugin: pluginKlass,
                mapping: sceneKey     // member name in each scene instance
            },
            // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

#### Load and add plugin from file

```javascript
scene.load.scenePlugin(key, url, systemKey, sceneKey);
```

1. load file from url
1. Create instance : `new winodw[key](pluginManager)`
1. Put instance in `plugins[key]`
