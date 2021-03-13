## Introduction

Parse expression string into function.  
Parser is generated from [jison](https://github.com/zaach/jison)

- Author: Rex
- Member of scene

## Live demos

- [Dot-notation](https://codepen.io/rexrainbow/pen/eYBxabb)
- [Custom method](https://codepen.io/rexrainbow/pen/bGBzyZY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/expression-parser)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexexpressionparserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexexpressionparserplugin.min.js', true);
    ```
- Add parser
    ```javascript
    var parser = scene.plugins.get('rexexpressionparserplugin').add();
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ExpressionParserPlugin from 'phaser3-rex-plugins/plugins/expressionparser-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexExpressionParserPlugin',
                plugin: ExpressionParserPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add parser
    ```javascript
    var parser = scene.plugins.get('rexExpressionParserPlugin').add();
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ExpressionParser from 'phaser3-rex-plugins/plugins/expressionparser.js';
    ```
- Add parser
    ```javascript
    var parser = new ExpressionParser();
    ```

### Create instance

```javascript
var parser = scene.plugins.get('rexExpressionParserPlugin').add();
```

### Execute

#### Compile then execute

1. Compile expression string into function
    ```javascript
    var f = parser.compile(expressionString);
    ```
    - `expressionString` :
        - Arithmetic : `'(a + b.c) * 3 + (2 % 3)'`
        - Boolean : `'(a > 10) && (a < 30) || (b.c > c)'`    
        - Condition : `'(a > b.c)? a:b.c'`
        - [Custom method](expression-parser.md#custom-method) : `randomInt(a, b.c)`
1. Invoke function
    ```javascript
    var value = f(context);
    ```
    - `f` : Function object from compiled result.
    - `context` : Varables used in expression.
        ```javascript
        {
            a: 10,  // Number
            b: {c: 10},  // Objet with number property
            c: 20,
            randomInt(a, b) {  // Custom method
                return Math.floor(Math.random()*(b-a)+a);
            }
        }
        ```

#### Execute directly

```javascript
var value = parser.exec(expressionString, context);
```

or

```javascript
var value = parser.exec(f, context);
```

### Custom method

- Add method into parser instance
    ```javascript
    var parser = scene.plugins.get('rexExpressionParserPlugin').add();
    parser.randomInt = function(a, b) {
        return Math.floor(Math.random()*(b-a)+a); 
    }
    // var value = parser.exec('randomInt(a, b)', {a:10, b:20});
    ```
- Declare method into class of parser
    ```javascript
    class MyParser extends ExpressionParser {
        randomInt(a, b) {
            return Math.floor(Math.random()*(b-a)+a); 
        }
    }
    var parser = new MyParser();
    // var value = parser.exec('randomInt(a, b)', {a:10, b:20});
    ```
- Add method into context
    ```javascript
    var context = {
        a: 10,
        b: 20,
        randomInt(a, b) {  // Custom method
            return Math.floor(Math.random()*(b-a)+a);
        }
    }
    var value = parser.exec('randomInt(a, b)', context);
    ```