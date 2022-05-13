## Introduction

Custom progress bar based on [custom-shapes](shape-custom-shapes.md).

- Author: Rex
- Game object

## Live demos

- [React-circle-progress-bar](https://codepen.io/rexrainbow/pen/abWpYWd)
- [Trapezoid Mask](https://codepen.io/rexrainbow/pen/BaZKBpj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/custom-progress)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcustomprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcustomprogressplugin.min.js', true);
    ```
- Add custom shapes object
    ```javascript
    var customProgress = scene.add.rexCustomProgress(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CustomProgressPlugin from 'phaser3-rex-plugins/plugins/customprogress-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCustomProgressPlugin',
                plugin: CustomProgressPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add custom shapes object
    ```javascript
    var customProgress = scene.add.rexCustomProgress(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CustomProgress from 'phaser3-rex-plugins/plugins/bbcodetext.js';
    ```
- Add custom shapes object
    ```javascript
    var customProgress = new CustomProgress(scene, x, y, width, height, config);
    scene.add.existing(customProgress);
    ```

### Add custom shapes object

```javascript
var customProgress = scene.add.rexCustomProgress(x, y, width, height, {
    // type: 'rexCustomProgress',

    create: [
        { name: name0, type: shapeType},
        { name: name1, type: shapeType},
        ...
    ],

    // create: {
    //     shapeType: [name0, name1, ...],
    //     shapeType: number,
    //     shapeType: name,
    // },

    // create: function() {
    // 
    // },

    update: function() {

    },

    value: 0,
    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, circularProgress) {
    },
});
```

or

```javascript
var customProgress = scene.add.rexCustomProgress({
    // x: 0,
    // y: 0,
    // width: 64,
    // height: 64,
    // type: 'rexCustomProgress',

    create: [
        { name: name0, type: shapeType},
        { name: name1, type: shapeType},
        ...
    ],

    // create: {
    //     shapeType: [name0, name1, ...],
    //     shapeType: number,
    //     shapeType: name,
    // },

    // create: function() {
    // 
    // },

    update: function() {

    },
    
    value: 0,
    easeValue: {
        duration: 0,
        ease: 'Linear'
    },

    valuechangeCallback: function(newValue, oldValue, circularProgress) {
    },
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
- `create` : Callback to create shapes
    - An array of object with `name` and `type`
        ```javascript
        { name: name0, type: shapeType }
        ```
        - `shapeType` : 
            - `'arc'` : Create [Arc shape](shape-custom-shapes.md#arc).
            - `'circle'` : Create [Circle shape](shape-custom-shapes.md#circle).
            - `'ellipse'` : Create [Ellipse shape](shape-custom-shapes.md#ellipse).
            - `'line'` : Create [Line shape](shape-custom-shapes.md#line).
            - `'lines'` : Create [Lines shape](shape-custom-shapes.md#lines).
            - `'rectangle'` : Create [Rectangle shape](shape-custom-shapes.md#rectangle).
            - `'triangle'` : Create [Triangle shape](shape-custom-shapes.md#triangle).
    - A plain object with `shapeType: name`, or `shapeType: number`
        - `shapeType` : `arc`, `circle`, `ellipse`, `line`, `rectangle`, `triangle`
        - `nameArray` : An array of unique string name for each shape.
        - `name` : An unique string name of this shape.
        - `number` : Amount of shapes to create.
    - A callback
        ```javascript
        function() {
            // this : This custom shapes game object
            var shape = this.createShape(shapeType, name);
            this.addShape(shape);
        }
        ```
        - `this.createShape(shapeType, name)` : Crate a shape instance, with an unique name.
        - `this.addShape(shape)` : Add this shape instance to this custom custom shapes.
- `update` : Callback when refresh
    ```javascript
    function() {
        // this : This custom shapes game object     
        var shapes = this.getShapes();
        var shape = this.getShape(name);
        // ...
        // var isSizeChanged = this.isSizeChanged;

        // var fillColor = this.fillColor;
        // var fillAlpha = this.fillAlpha;
        // var lineWidth = this.lineWidth;
        // var strokeColor = this.strokeColor;
        // var strokeAlpha = this.strokeAlpha;
        // ...
    }
    ```
    - Shape instances : Change properties of shape instances.
        - `this.getShapes()` : Return all shapes in an array.
        - `this.getShape(name)` : Return a shape by the unique string name.
    - Is size changed : `this.isSizeChanged`
    - Fill style : `this.fillColor`, `this.fillAlpha`
    - Stroke style : `this.strokeColor`, `this.strokeAlpha`, `this.lineWidth`
- `value` : `0` ~ `1`, progress value. Default is `0`.
- `easeValue` : Parameters of easing value.
    - `easeValue.duration` : Duration of value easing, default is `0` (no easing).
    - `easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `valuechangeCallback` : callback function when value changed.
    ```javascript
    function(newValue, oldValue, customProgress) {
    }
    ```

#### Set update shape callback

See [Shape class](shape-custom-shapes.md#set-update-shape-callback)

#### Size

See [Size](shape-custom-shapes.md#size)

#### Styles

See [Styles](shape-custom-shapes.md#styles)

#### Recreate shapes

See [Shape class](shape-custom-shapes.md#recreate-shapes)

### Progress value

- Get value
    ```javascript
    var value = customProgress.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = customProgress.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = customProgress.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    customProgress.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    customProgress.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    customProgress.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    customProgress.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    customProgress.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    customProgress.value += inc; // inc: 0 ~ 1
    ```

### Ease progress value

- Ease value to
    ```javascript
    customProgress.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    customProgress.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    customProgress.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    customProgress.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    customProgress.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

#### Refresh

Redraw shapes when

- Value changed : `customProgress.setValue(newValue)`, `customProgress.easeValueTo(newValue)`
- Resize : `customProgress.resize(width, height)`
- Set dirty : `customProgress.setDirty()`
- Set update shape callback : `customProgress.setUpdateShapesCallback(callback)`

#### Shape class

See [Shape class](shape-custom-shapes.md#shape-class)

### Events

- On value changed
    ```javascript
    customProgress.on('valuechange', function(newValue, oldValue, customProgress){
        //
    }, scope);
    ```

### Alpha

- Get
    ```javascript
    var alpha = customProgress.alpha;
    ```
- Set
    ```javascript
    customProgress.setAlpha(alpha);
    // customProgress.alpha = alpha;
    ```
