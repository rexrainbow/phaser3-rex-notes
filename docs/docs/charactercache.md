## Introduction

Generate bitmapfont from [text game object](text.md), or [bbcode text game object](bbcodetext.md).

- Author: Rex
- Member of scene

## Live demos

- [Set text](https://codepen.io/rexrainbow/pen/vYpLPGV)
- [Textbox](https://codepen.io/rexrainbow/pen/ExoKpxN)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/charactercache)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcharactercacheplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcharactercacheplugin.min.js', true);
    ```
- Add character-cache object
    ```javascript
    var characterCache = scene.plugins.get('rexcharactercacheplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CharacterCachePlugin from 'phaser3-rex-plugins/plugins/charactercache-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCharacterCache',
                plugin: CharacterCachePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add character-cache object
    ```javascript
    var characterCache = scene.plugins.get('rexCharacterCache').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CharacterCache from 'phaser3-rex-plugins/plugins/charactercache.js';
    ```
- Add character-cache object
    ```javascript
    var characterCache = new CharacterCache(scene, config);
    ```

### Create instance

```javascript
var characterCache = scene.plugins.get('rexCharacterCache').add(scene, {
    key: '',  
    cellWidth: 32,
    cellHeight: 32,
    maxCharacterCount: 4096,
    freqMode: true,

    textObject: textGameOject,

    content: '',
});
```

- `key` : Texture key in [texture manager](textures.md)
- `cellWidth`, `cellHeight` : Maximum frame size.
- `maxCharacterCount` : Maximun character count.
    - Width of texture = `Math.ceil(Math.sqrt(maxCharacterCount)) * cellWidth`
    - Height of texture = `Math.ceil(Math.sqrt(maxCharacterCount)) * cellHeight`
- `freqMode` : 
    - `true` : Swap out un-unsed and low-frequence character.
    - `false` : Swap out any un-unsed character.
- `textObject` : [Text game object](text.md), or [bbcode text game object](bbcodetext.md) for drawing character.
- `content` : Load these characters into cache.

### Load characters

Load characters into bitmap font, replace unused characters if no free character space.

```javascript
characterCache.load(content);
// characterCache.load(content, lock);
```

- `content` : Characters in a string.
- `lock`
    - `true` : Lock these characters, won't be replaced out later.
    - `false` : Don't lock these characters, can be replaced out later. Default behavior.

!!! warning
    Console.warn messages if no unused character is found.

### Events

- Add a character
    ```javascript
    characterCache.on('add', function(character, textObject) {
        // Can change style of textObject here
    })
    ```
- Swap out a character
    ```javascript
    characterCache.on('remove', function(character, textObject) {
    })
    ```

### Override bitmaptext

Inject `characterCache.load(text)` into `bitmapText.setText(text)` method.

```javascript
characterCache.overrideBitmapText(bitmapText);
// var bitmapText = characterCache.overrideBitmapText(bitmapText);
```

Now `setText` method has `lock` parameter : `bitmapText.setText(text, lock)`.

Or user can override `bitmapText.setText` by extending `Phaser.GameObjects.BitmapText` class.

### Unlock all characters

```javascript
characterCache.unlock();
```

### Get all cache data

```javascript
var cacheData = characterCache.getAllData();
```

- `cacheData` : Array of cache data
    ```typescript
    {
        character: string,
        freq: number,
        alive: boolean,
        lock: boolean,
    }
    ```

### Destroy instance

```javascript
characterCache.destroy();
```

### Properties

- `characterCache.key` : Font key.
- `characterCache.cellWidth`, `characterCache.cellHeight` : Cell size.
- `characterCache.inCacheCount` : Amount of characters in cache.