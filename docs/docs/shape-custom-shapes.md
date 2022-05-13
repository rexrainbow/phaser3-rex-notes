## Introduction

Custom shapes on shape.

- Author: Rex
- Game object

## Live demos

- [Speech bubble](https://codepen.io/rexrainbow/pen/vYgjyPJ)
- [Jigsaw](https://codepen.io/rexrainbow/pen/vYZNZwr)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/custom-shapes)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcustomshapesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcustomshapesplugin.min.js', true);
    ```
- Add custom shapes object
    ```javascript
    var customShapes = scene.add.rexCustomShapes(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CustomShapesPlugin from 'phaser3-rex-plugins/plugins/customshapes-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCustomShapesPlugin',
                plugin: CustomShapesPlugin,
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
    var customShapes = scene.add.rexCustomShapes(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CustomShapes from 'phaser3-rex-plugins/plugins/bbcodetext.js';
    ```
- Add custom shapes object
    ```javascript    
    var customShapes = new CustomShapes(scene, x, y, width, height, config);
    scene.add.existing(customShapes);
    ```

### Add custom shapes object

```javascript
var customShapes = scene.add.rexCustomShapes(x, y, width, height, {
    // type: 'rexCustomShapes',

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
});
```

or

```javascript
var customShapes = scene.add.rexCustomShapes({
    // x: 0,
    // y: 0,
    // width: 64,
    // height: 64,
    // type: 'rexCustomShapes',

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
    }
    ```
    - Shape instances : Change properties of shape instances.
        - `this.getShapes()` : Return all shapes in an array.
        - `this.getShape(name)` : Return a shape by the unique string name.
    - Is size changed : `this.isSizeChanged`
    - Fill style : `this.fillColor`, `this.fillAlpha`
    - Stroke style : `this.strokeColor`, `this.strokeAlpha`, `this.lineWidth`

#### Set update shape callback

```javascript
customShapes.setUpdateShapesCallback(callback);
```

- `callback` :
    ```javascript
    function() {
        // this : This custom shapes game object     
        var shapes = this.getShapes();
        var shape = this.getShape(name);
        // ...
        // var isSizeChanged = this.isSizeChanged;
    }
    ```
    - Shape instances : Change properties of shape instances.
        - `this.getShapes()` : Return all shapes in an array.
        - `this.getShape(name)` : Return a shape by the unique string name.
    - Is size changed: `this.isSizeChanged`

#### Size

```javascript
customShapes.setSize(width, height);
```
or
```javascript
customShapes.resize(width, height);
```
or
```javascript
customShapes.width = width;
customShapes.height = height;
```

Will set dirty and redraw shapes

#### Styles

- Fill style
    ```javascript
    customShapes.setFillStyle(color, alpha);
    ```
    or
    ```javascript
    customShapes.fillColor = color;
    customShapes.fillAlpha = alpha;
    ```  
- Stroke style
    ```javascript
    customShapes.setStrokeStyle(lineWidth, color, alpha);
    ```
    or
    ```javascript
    customShapes.lineWidth = lineWidth;
    customShapes.strokeColor = color;
    customShapes.strokeAlpha = alpha;
    ```

Will set dirty and redraw shapes. Apply styles to shapes in update callback.

#### Recreate shapes

- Clear all shapes
    ```javascript
    customShapes.clear();
    ```
- Add new shape
    ```javascript
    customShapes.createShape(shapeType, name);
    ```
    - `shapeType` : 
        - `'arc'` : Create [Arc shape](shape-custom-shapes.md#arc).
        - `'circle'` : Create [Circle shape](shape-custom-shapes.md#circle).
        - `'ellipse'` : Create [Ellipse shape](shape-custom-shapes.md#ellipse).
        - `'line'` : Create [Line shape](shape-custom-shapes.md#line).
        - `'lines'` : Create [Lines shape](shape-custom-shapes.md#lines).
        - `'rectangle'` : Create [Rectangle shape](shape-custom-shapes.md#rectangle).
        - `'triangle'` : Create [Triangle shape](shape-custom-shapes.md#triangle).
    - `name` : A string name of this shape.

#### Refresh

Redraw shapes when

- Resize : `customShapes.resize(width, height)`
    - `customShapes.isSizeChanged` will also be `true`.
- Set fill color : `customShapes.setFillStyle(color, alpha)`
- Set stroke color : `customShapes.setStrokeStyle(lineWidth, color, alpha)`
- Set dirty : `customShapes.setDirty()`
- Set update shape callback : `customShapes.setUpdateShapesCallback(callback)`

#### Update shape data

Shape data will be updated during rendering, or call `shape.updateData()` to update shape data before rendering.

#### Shape class

##### Common properties

- Style
    - Get
        ```javascript
        var fillColor = shape.fillColor;
        var fillAlpha = shape.fillAlpha;
        var lineWidth = shape.lineWidth;
        var strokeColor = shape.strokeColor;
        var strokeAlpha = shape.strokeAlpha;
        ```
    - Set
        ```javascript
        shape.fillStyle(color, alpha);
        shape.lineStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        shape.fillStyle().lineStyle();
        ```
- Private data
    - Get
        ```javascript
        var data = shape.getData(key);
        // var data = shape.getData(key, defaultValue);
        ```
    - Set
        ```javascript
        shape.setData(key, value);
        ```
        or
        ```javascript
        shape.setData({key:value, ...});
        ```
    - Inc
        ```javascript
        shape.incData(key, incValue);
        // shape.incData(key, incValue, defaultValue);
        ```
    - Mul
        ```javascript
        shape.mulData(key, mulValue);
        // shape.mulData(key, mulValue, defaultValue);
        ```  
    - Clear
        ```javascript
        shape.clearData();
        ```      
- Name
    - Get
        ```javascript
        var name = shape.name;
        ```

##### Line

- End points
    - Get
        ```javascript
        var x0 = line.x0;
        var y0 = line.y0;
        var x1 = line.x1;
        var y1 = line.y1;
        ```
    - Set
        ```javascript
        line.setP0(x, y);
        line.setP1(x, y);
        ```
        or
        ```javascript
        line.x0 = x0;
        line.y0 = y0;
        line.x1 = x1;
        line.y1 = y1;
        ```

##### Lines

- Start position
    ```javascript
    lines.startAt(x, y);
    ```
- Line to
    - To position
        ```javascript
        lines.lineTo(x, y);
        ```
    - To relative position
        ```javascript
        lines.lineTo(x, y, true);
        ```
    - To vertical position
        ```javascript
        lines.verticalLineTo(x);
        ```
    - To relative vertical position
        ```javascript
        lines.verticalLineTo(x, true);
        ```
    - To horizontal position
        ```javascript
        lines.horizontalLineTo(y);
        ```
    - To relative horizontal position
        ```javascript
        lines.horizontalLineTo(y, true);
        ```
- Add arc composed of lines
    ```javascript
    lines.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
    ```
    - `startAngle`, `endAngle` : Start and end angle in degrees.
- Add elliptical arc composed of lines
    ```javascript
    lines.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);
    ```
    - `startAngle`, `endAngle` : Start and end angle in degrees.
- Add quadratic bezier of lines
    ```javascript
    lines.quadraticBezierTo(cx, cy, x, y);
    ```
    - `cx`, `cy` : Control point
    - `x`, `y` : End point
- Add smooth quadratic bezier of lines
    ```javascript
    lines.smoothQuadraticBezierTo(x, y);
    ```
    - `x`, `y` : End point
- Add cubic bezier of lines
    ```javascript
    lines.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
    ```
    - `cx0`, `cy0` : Control point0
    - `cx1`, `cy1` : Control point1
    - `x`, `y` : End point
- Add smooth cubic bezier of lines
    ```javascript
    lines.smoothCubicBezierCurveTo(cx1, cy1, x, y);
    ```
    - `cx1`, `cy1` : Control point1
    - `x`, `y` : End point
- End commands
    - Close path, to fill color
        ```javascript
        lines.close();
        ```
    - End path, to draw lines only
        ```javascript
        lines.end();
        ```
- Offset all points
    ```javascript
    lines.offset(x, y);
    ```
- Rotation all points
    ```javascript
    lines.rotateAround(centerX, centerY, angle);
    ```
    - `angle` : Rotate angle in degrees.
- Get polygon
    ```javascript
    var polygon = lines.toPolygon();
    ```
    - Can be used in [`setInteractive method`](touchevents.md#register-interactive)
        ```javascript
        shape.setInteractive({
            hitArea: shape.getShapes()[0].toPolygon(),
            hitAreaCallback: Phaser.Geom.Polygon.Contains,
        })
        ```

##### Rectangle

- Top-left
    - Get
        ```javascript
        var left = rectangle.x;
        var top = rectangle.y;
        ```
    - Set
        ```javascript
        rectangle.setTopLeftPosition(x, y);
        ```
        or
        ```javascript
        rectangle.x = left;
        rectangle.y = top;
        ```
- Size
    - Get
        ```javascript
        var width = rectangle.width;
        var height = rectangle.height;
        ```
    - Set
        ```javascript
        rectangle.setSize(width, height);
        ```
        or
        ```javascript
        rectangle.width = width;
        rectangle.height = height;
        ```

##### Triangle

- Vertices
    - Get
        ```javascript
        var x0 = triangle.x0;
        var y0 = triangle.x0;
        var x1 = triangle.x1;
        var y1 = triangle.x1;
        var x2 = triangle.x2;
        var y2 = triangle.x2;
        ```
    - Set
        ```javascript
        triangle.setP0(x, y);
        triangle.setP1(x, y);
        triangle.setP2(x, y);
        ```
        or
        ```javascript
        triangle.x0 = x0;
        triangle.x0 = y0;
        triangle.x1 = x1;
        triangle.x1 = y1;
        triangle.x2 = x2;
        triangle.x2 = y2;
        ```

##### Arc

- Center position
    - Get
        ```javascript
        var x = arc.x;
        var y = arc.y;
        ```
    - Set
        ```javascript
        arc.setCenterPosition(x, y);
        ```
        or
        ```javascript
        arc.x = x;
        arc.y = y;
        ```
- Radius
    - Get
        ```javascript
        var radiusX = arc.radiusX;
        var radiusY = arc.radiusY;
        ```
    - Set
        ```javascript
        arc.setRadius(radiusX, radiusY);
        // arc.setRadius(radius);
        ```
        or
        ```javascript
        arc.radiusX = radiusX;
        arc.radiusY = radiusY;
        ```
- Angles
    - Get
        ```javascript
        var startAngle = arc.startAngle;
        var endAngle = arc.endAngle;
        var anticlockwise = arc.anticlockwise; // boolean        
        ```
    - Set
        ```javascript
        arc.setAngle(startAngle, endAngle);  // anticlockwise = false
        // arc.setAngle(startAngle, endAngle, anticlockwise);
        ```
        or
        ```javascript
        arc.startAngle = startAngle;
        arc.endAngle = endAngle;
        arc.anticlockwise = anticlockwise; // boolean
        ```
        - `startAngle`, `endAngle` : Start/end angle in degrees.
- Pie
    - Get
        ```javascript
        var pie = arc.pie; // boolean
        ```
    - Set
        ```javascript
        arc.setPie();
        ```
        or
        ```javascript
        arc.pie = true;
        ```

##### Circle

- Center position
    - Get
        ```javascript
        var x = arc.x;
        var y = arc.y;
        ```
    - Set
        ```javascript
        arc.setCenterPosition(x, y);
        ```
        or
        ```javascript
        arc.x = x;
        arc.y = y;
        ```
- Radius
    - Get
        ```javascript
        var radiusX = arc.radiusX;
        var radiusY = arc.radiusY;
        ```
    - Set
        ```javascript
        arc.setRadius(radiusX, radiusY);
        // arc.setRadius(radius);
        ```
        or
        ```javascript
        arc.radiusX = radiusX;
        arc.radiusY = radiusY;
        ```

##### Ellipse

The same as Circle.

### Alpha

- Get
    ```javascript
    var alpha = shape.alpha;
    ```
- Set
    ```javascript
    shape.setAlpha(alpha);
    // shape.alpha = alpha;
    ```

### Compare with similar plugins

- [Custom Shapes](shape-custom-shapes.md) : Draw shapes.
- [Custom Porgress](shape-custom-progress.md) : Similar with custom-shapes, plus a `value` property
- [Custom Spinner](shape-spinner.md#custom-spinner) : Similar with custom-progress, plus a `value` tween task.