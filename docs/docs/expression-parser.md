## Introduction

Parse expression string into function.  
Parser is generated from [jison](https://github.com/zaach/jison)

- Author: Rex
- Member of scene

## Live demos

- [Dot-notation](https://codepen.io/rexrainbow/pen/eYBxabb)
- [Custom method](https://codepen.io/rexrainbow/pen/bGBzyZY)
- [Proxy as context](https://codepen.io/rexrainbow/pen/Bawreqm)

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
- Or, parse expression to function object.
    ```javascript
    var f = scene.plugins.get('rexexpressionparserplugin').compile(expressionString);
    // var value = f(context);
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
- Or, parse expression to function object.
    ```javascript
    var f = scene.plugins.get('rexExpressionParserPlugin').compile(expressionString);
    // var value = f(context);
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
    or
    ```javascript
    var f = scene.plugins.get('rexExpressionParserPlugin').compile(expressionString);
    ```
    - `expressionString` :
        - Number : `1`, `1.5`, `0xf`.
        - Variable : `a`, `$a`, `_a`, `a.$b._c_`, `a['b'].c`
        - Arithmetic : `+`, `-`, `*`, `\`, `%`, `(`, `)`, ex : `'(a + b.c) * 3 + (2 % 3)'`.
        - Boolean : `>`, `<`, `>=`, `<=`, `==`, `!=`, `&&`, `||`, ex `'(a > 10) && (a < 30) || (b.c > c)'`.
        - Condition : `(cond)? v0:v1`, ex`'(a > b.c)? a:b.c'`.
        - [Custom method](expression-parser.md#custom-method) : `randomInt(a, b.c)`.
        - String concat : `'Hello ' + name`.
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

### Proxy as context

[Proxy](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 
with `has` and `get` handlers could be a context.

For example, proxy scene data :

```javascript
var context = new Proxy({}, {
    has(target, key) {
        return scene.data.has(key);
    },
    get(target, prop) {
        return scene.data.get(prop);
    }
})
```

or

```javascript
var context = scene.plugins.get('rexExpressionParserPlugin').createProxyContext({
    has(target, key) {
        // return boolean
    },
    get(target, prop) {
        // return any;
    }
})
```