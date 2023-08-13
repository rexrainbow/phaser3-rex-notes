## Introduction

Map level value from experience value, by callback or a number array.

- Author: Rex
- Object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/levelcounter)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlevelcounterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlevelcounterplugin.min.js', true);
    ```
- Add level-counter object
    ```javascript
    var levelCounter = scene.plugins.get('rexlevelcounterplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LevelCounterPlugin from 'phaser3-rex-plugins/plugins/levelcounter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLevelCounter',
                plugin: LevelCounterPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add level-counter object
    ```javascript
    var levelCounter = scene.plugins.get('rexLevelCounter').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LevelCounter from 'phaser3-rex-plugins/plugins/levelcounter.js';
    ```
- Add level-counter object
    ```javascript
    var levelCounter = new LevelCounter(config);
    ```

### Create instance

```javascript
var levelCounter = scene.plugins.get('rexLevelCounter').add({
    table: function(level) { return level * 100; },
    // table: [0, 100, 200, 300,],
    
    // maxLevel: -1,
    
    // exp: 0,
});
```

- `table` : Level table, return experience value from level value. Level value starts from `0`.
    - A callback
        ```javascript
        function(level) {
            return experience;
        }
        ```
    - A number array : Experience value of each level.
- `maxLevel` :
    - `undefined` : Default value
        - No upper limit for callback level table.
        - `(table.length - 1)` for number array level table.
    - A number : Maximum level value
- `exp` : Initial experience value. Default value is `0`.

### Accumulate experience

- Accumulate experience
    ```javascript
    levelCounter.gainExp(incExp);
    // levelCounter.exp += incExp;
    ```
    - Will fire `'levelup'` event many times.
- Reset experience value
    ```javascript
    levelCounter.resetExp(exp);
    ```
    - Won't fire `'levelup'` event.
- Force level up
    ```javascript
    levelCounter.setLevel(level);
    ```
    - Will fire `'levelup'` event many times.

### Level and experience

- Get current experience
    ```javascript
    var exp = levelCounter.getExp();
    // var exp = levelCounter.exp;
    ```
- Get current level
    ```javascript
    var level = levelCounter.getLevel();
    // var level = levelCounter.level;
    ```
- Get current required experience to next level
    ```javascript
    var exp = levelCounter.requiredExp;
    ```
- Get experience of level
    ```javascript
    var exp = levelCounter.getExp(level);
    ```
- Get level from experience
    ```javascript
    var level = levelCounter.getLevel(exp);
    ```
- Get required experience to level
    ```javascript
    var exp = levelCounter.getRequiredExpToNextLevel(level);
    // var exp = levelCounter.getRequiredExpToNextLevel(level, exp);
    ```

### Events

- Level-up when accumulating experience
    ```javascript
    levelCounter.on('levelup', function(level, fromExp, toExp, levelStartExp, levelEndExp){        
    });
    ```
    - `level` : To next level
    - `fromExp`, `toExp` : Experience increment from `fromExp` to `toExp`.
    - `levelStartExp`, `levelEndExp` : Range of this level.
