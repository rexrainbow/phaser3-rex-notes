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
    npm i phaser4-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ExpressionParserPlugin from 'phaser4-rex-plugins/plugins/expressionparser-plugin.js';
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
    npm i phaser4-rex-plugins
    ```
- Import class
    ```javascript
    import ExpressionParser from 'phaser4-rex-plugins/plugins/expressionparser.js';
    ```
- Add parser
    ```javascript
    var parser = new ExpressionParser();
    ```

### Create instance

```javascript
var parser = scene.plugins.get('rexExpressionParserPlugin').add();
```

or

```javascript
var parser = scene.plugins.get('rexExpressionParserPlugin').add({
    safeMode: false,
    cache: false,
    functions: {
        randomInt(a, b) {
            return Math.floor(Math.random()*(b-a)+a);
        }
    },
    values: {
        PI: Math.PI
    },
    defaultHandler(name, args, context) {
        return 0;
    },
    defaultValueHandler(name, context, path) {
        return 0;
    }
});
```

- `safeMode` : Restrict expression access when expression strings come from external data. Default value is `false`.
- `cache` : Cache compiled expressions. Default value is `false`.
- `functions` : Methods registered into parser.
- `values` : Values registered into parser.
- `defaultHandler` : Fallback callback for missing custom methods.
- `defaultValueHandler` : Fallback callback for missing variables or properties.

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
            - Escape sequence : `\n`, `\r`, `\t`, `\b`, `\f`, `\v`, `\0`, `\\`, `\'`, `\"`, `\xHH`, `\uHHHH`, `\u{H...}`.
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

- Register method into parser instance
    ```javascript
    var parser = scene.plugins.get('rexExpressionParserPlugin').add();
    parser.setFunction('randomInt', function(a, b) {
        return Math.floor(Math.random()*(b-a)+a);
    });
    // var value = parser.exec('randomInt(a, b)', {a:10, b:20});
    ```
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

### Custom value

Register shared values into parser instance.

```javascript
var parser = scene.plugins.get('rexExpressionParserPlugin').add();
parser.setValue('PI', Math.PI);
parser.setValue('math.E', Math.E);
```

```javascript
var value = parser.exec('r * r * PI', { r: 10 });
```

- `setValue(name, value)` : Register a value.
- `setValues(values)` : Register multiple values.
- `getValue(name, defaultValue)` : Get a registered value.
- `removeValue(name)` : Remove a registered value.
- `clearValues()` : Remove all registered values.

### Default handler

Fallback callback for missing custom methods.

```javascript
parser.defaultHandler = function(name, args, context) {
    return 0;
}
```

- `name` : Missing method name, for example `'randomInt'` or `'math.randomInt'`.
- `args` : Evaluated arguments.
- `context` : Evaluation context.

Default handler could also be declared in context, which has higher priority than parser's default handler.

```javascript
var context = {
    a: 10,
    b: 20,
    defaultHandler(name, args, context) {
        return 0;
    }
}
```

### Default value handler

Fallback callback for missing variables or properties.

```javascript
parser.defaultValueHandler = function(name, context, path) {
    return 0;
}
```

- `name` : Missing variable or property path, for example `'a'` or `'player.hp'`.
- `context` : Evaluation context.
- `path` : Evaluated property path segments, for example `['player', 'hp']`.

Default value handler could also be declared in context, which has higher priority than parser's default value handler.

```javascript
var context = {
    defaultValueHandler(name, context, path) {
        throw new Error(`Unknown variable: ${name}`);
    }
}
```

### Safe mode

Restrict expression access when expression strings come from external data.

```javascript
var parser = new ExpressionParser({
    safeMode: true
});
```

or

```javascript
parser.setSafeMode(true);
```

In safe mode :

- Property lookup only reads own properties, not prototype properties.
- Unsafe property names are blocked : `__proto__`, `prototype`, `constructor`.
- Method calls can only invoke context methods or functions registered by `setFunction()`.
- Parser instance or prototype methods are not callable from expressions.
- Unsafe property access throws an error and does not call `defaultValueHandler` or `defaultHandler`.

```javascript
parser.setFunction('randomInt', function(a, b) {
    return Math.floor(Math.random()*(b-a)+a);
});
```

### Cache

Cache compiled expressions.

```javascript
var parser = new ExpressionParser({
    cache: true
});
```

or

```javascript
parser.setCacheEnable(true);
```

```javascript
var value = parser.exec('a + b', { a: 10, b: 20 });
parser.clearCache();
```

`compile()` also accepts a cache option.

```javascript
var f = parser.compile('a + b', {
    cache: true
});
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
