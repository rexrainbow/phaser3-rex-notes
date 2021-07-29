## Introduction

Achievements in a csv table.

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/achievements)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexachievementsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexachievementsplugin.min.js', true);
    ```
- Add conditions-table object
    ```javascript
    var achievements = scene.plugins.get('rexachievementsplugin').add();
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import AchievementsPlugin from 'phaser3-rex-plugins/plugins/achievements-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexAchievements',
                plugin: AchievementsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add conditions-table object
    ```javascript
    var achievements = scene.plugins.get('rexAchievements').add();
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Achievements from 'phaser3-rex-plugins/plugins/achievements.js';
    ```
- Add conditions-table object
    ```javascript
    var achievements = new Achievements();
    ```

### Create instance

```javascript
var achievements = scene.plugins.get('rexAchievements').add();
```

### Load table from csv string

```javascript
achievements.loadCSV(csvString, {
    // delimiter: ','
});
```

For exameple, csv string

|      |      | A      | A    |
| ---- | ---- | ------ | ---- |
| Lv1  | Ach1 | \>= 10 | < 20 |
| Lv1  | Ach2 | \>= 20 | < 50 |
| Lv1  | Ach3 | \>= 50 |      |

```raw
,A,A
Lv1,Ach1,>= 10,<= 20,
Lv1,Ach2,>= 20,< 50,
Lv1,Ach3,>= 50,,
```

- 1st column : Level names
- 2nd column : Achievement names
- Other columns : Condtions
- 1st row : Variable names of conditions.

means that:

```raw
Lv1, Ach1: (A>=10) && (A<20)
Lv1, Ach2: (A>=20) && (A<50)
Lv1, Ach3: (A>=50)
```

### Test

1. Run test
    ```javascript
    var achievements.runTest(levelName, values);
    ```
    - `levelName` : Level name, in 1st column of achievements table.
    - `values` : Inputs in Key-value pairs
1. Get obtained states
    ```javascript
    var states = achievements.getObtainedState(levelName);
    ```
    - `states` : Obtained states of `levelName`
        ```javascript
        {
            achievementName: {
                wasObtained: boolean,
                justObtained: boolean
            }
        }
        ```
        - `wasObtained` : Obtained this achievement `achievementName` before last testing.
        - `justObtained` : Obtained this achievement `achievementName` at last testing.

or

```javascript
var states = achievements.getTestResults(levelName, values);
```

### Get obtained states

- Get obtained states of an achievement in a level
    ```javascript
    var state = achievements.getObtainedState(levelName, achievementName);
    ```
    - `state` : Obtained states of `achievementName`, in level `levelName`
        ```javascript
        {
            wasObtained: boolean,
            justObtained: boolean
        }
        ```
        - `wasObtained` : Obtained this achievement `achievementName` before last testing.
        - `justObtained` : Obtained this achievement `achievementName` at last testing.
- Get obtained states of a level
    ```javascript
    var state = achievements.getObtainedState(levelName);
    ```
    - `states` : Obtained states of `levelName`
        ```javascript
        {
            achievementName: {
                wasObtained: boolean,
                justObtained: boolean
            }
        }
        ```
- Get obtained states of all levels
    ```javascript
    var state = achievements.getObtainedState();
    // var state = achievements.getObtainedStates();
    ```
    - `states` : Obtained states of all levels
        ```javascript
        {
            levelName: {
                achievementName: {
                    wasObtained: boolean,
                    justObtained: boolean
                }
            }
        }
        ```
- For each obtained state in a level
    ```javascript
    achievements.forEachObtainedState(levelName, function(levelName, achievementName, state) {

    }, scope)
    ```
    - `state` : Obtained states of `achievementName`, in level `levelName`
        ```javascript
        {
            wasObtained: boolean,
            justObtained: boolean
        }
        ```

### Get name

- Name of levels
    ```javascript
    var names = achievements.getLevelNames();
    // var names = achievements.getLevelNames(out);
    ```
- Name of achievements in a level
    ```javascript
    var names = achievements.getAchievementNames(levelName);
    // var names = achievements.getAchievementNames(levelName, out);
    ```

### Save & load obtained states

- Get obtained states
    ```javascript
    var states = achievements.getObtainedStates();
    ```
- Load obtained states
    ```javascript
    achievements.loadObtainedStates(states);
    ```

### Set obtained state

- Set `wasObtained`, `justObtained` properties to `true`.
    ```javascript
    achievements.setObtainedState(levelName, achievementName);
    ```
- Set `wasObtained`, `justObtained` properties to `false`.
    ```javascript
    achievements.clearObtainedState(levelName, achievementName);
    // achievements.setObtainedState(levelName, achievementName, false);
    ```