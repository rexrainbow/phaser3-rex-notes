## Introduction

A wrap of [fuzzy logic](https://github.com/Mugen87/yuka/tree/master/src/fuzzy) (MIT license).

- Author of wrap : Rex , Core API : [Michael Herzog](https://github.com/Mugen87)
- Member of scene, or game object

## Live demos

- [Fuzzy](https://codepen.io/rexrainbow/pen/GRERQGG)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/fuzzy)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfuzzyplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfuzzyplugin.min.js', true);
    ```
- Add fuzzy module object
    ```javascript
    var fuzzyModule = scene.plugins.get('rexfuzzyplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GashaponPlugin from 'phaser3-rex-plugins/plugins/fuzzy-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGashapon',
                plugin: GashaponPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add fuzzy module object
    ```javascript
    var fuzzyModule = scene.plugins.get('rexFuzzy').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import BuildFuzzyModule from 'phaser3-rex-plugins/plugins/fuzzy.js';
    ```
- Add fuzzy module object
    ```javascript
    var fuzzyModule = BuildFuzzyModule(config);
    ```

### Create instance

```javascript
var fuzzyModule = scene.plugins.get('rexFuzzy').add(`
// Declare fuzzy sets
FuzzySetName : left, middle, right, setType
FuzzySetName : left, middle, right
FuzzySetName : left, right

// Declare rules
FuzzySetNameA => FuzzySetNameT
FuzzySetNameA and FuzzySetNameB => FuzzySetNameT
FuzzySetNameA or FuzzySetNameB => FuzzySetNameT
FuzzySetNameA or (FuzzySetNameA and FuzzySetNameB) => FuzzySetNameT

// More comment lines...
`);
```

- `config` can be a multiple lines string, or a plain object
    - A multiple lines string contains
        - `FuzzySetName : left, middle, right, setType` : Declare a fuzzy set
            - `FuzzySetName` : Fuzzy set name in one of these format
                - Variable name with postfix `'+'`, or `'-'`. For example, `HP-`, `HP`, `HP+`, `HP--`, `HP++`, the variable name is `HP`.
                - `variableName.setName`. For example, `DIST.near`, `DIST.middle`, `DIST.far`, the variable name is `DIST`.
                    - Variable name and set name are composed of number(0-9) or English characters (A-Za-z).
            - `left`, `middle`, `right` : Left, middle, right point of fuzzy set, in numbers.
                - `left`, `right` : Two numbers for left and right point, middle point is the average of (left + right).
            - `setType` : 
                - Can be one of these string, or none.
                    - Left part : `leftShoulder`, `leftSCurve`. 
                        - Default value is `leftShoulder` for first fuzzy set of a variable.
                    - Right part : `rightShoulder`, `rightSCurve`. 
                        - Default value is `rightShoulder` for last fuzzy set of a variable.
                    - Middle parts : `triangular`, `singleton`, `normal`. 
                        - Default value is `triangular` for other fuzzy sets of a variable.
        - `FuzzySetNameA and FuzzySetNameB => FuzzySetNameT` : Declare a fuzzy rule.
        - `// ... ` : Comment lines
    - A plain object
        ```javascript
        {
            variables: {
                VariableName: [
                    [leftSetName, left, middle, right, setType],
                    [middleSetName, left, middle, right, setType],
                    [rightSetName, left, middle, right, setType],
                ],
                // ....
            },

            rules: [
                'FuzzySetNameA => FuzzySetNameT',
                'FuzzySetNameA and FuzzySetNameB => FuzzySetNameT',
                'FuzzySetNameA or FuzzySetNameB => FuzzySetNameT',
                // ...
            ]

        }
        ```

Fuzzy plugin will parse string input into JSON object then invoke fuzzy api internally.

- [Declare a fuzzy set](https://github.com/Mugen87/yuka/blob/master/examples/fuzzy/src/Soldier.js#L131)
- [Declare a fuzzy rule](https://github.com/Mugen87/yuka/blob/master/examples/fuzzy/src/Soldier.js#L157)

### Set input

```javascript
fuzzyModule.fuzzify(variableName, value);
```

- `variableName` : A antecedent variable name string.
- `value` : A number.

### Get result

```javascript
var result = fuzzyModule.defuzzify(variableName);
```

- `variableName` : A consequence variable name string.