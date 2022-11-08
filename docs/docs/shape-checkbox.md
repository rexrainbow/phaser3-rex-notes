## Introduction

Checkbox shape [input](button.md) with drawing checker path animation.

- Author: Rex
- Game object

## Live demos

- [Checkbox](https://codepen.io/rexrainbow/pen/rNKMxOb)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/checkbox)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcheckboxplugin', 'https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rexcheckboxplugin.min.js', true);
    ```
- Add shape object
    ```javascript
    var checkbox = scene.add.rexCheckbox(x, y, width, height, color, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CheckboxPlugin from 'phaser3-rex-plugins/plugins/checkbox-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCheckboxPlugin',
                plugin: CheckboxPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add shape object
    ```javascript
    var checkbox = scene.add.rexCheckbox(x, y, width, height, color, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Checkbox from 'phaser3-rex-plugins/plugins/checkbox.js';
    ```
- Add shape object
    ```javascript    
    var checkbox = new Checkbox(scene, x, y, width, height, color, config);
    scene.add.existing(checkbox);
    ```

### Create shape object

```javascript
var checkbox = scene.add.rexCheckbox(x, y, width, height, color, config);
```

or

```javascript
var checkbox = scene.add.rexCheckbox({
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    color: 0x005cb2,
    boxFillAlpha: 1,
    uncheckedColor: null,
    uncheckedBoxFillAlpha: 1,

    boxLineWidth: 4,
    boxStrokeColor: 0x005cb2,
    boxStrokeAlpha: 1,
    uncheckedBoxStrokeColor: 0x005cb2,
    uncheckedBoxStrokeAlpha: 1,

    checkerColor: 0xffffff,
    checkerAlpha: 1,

    circleBox: false,

    animationDuration: 150,

    checked: false,
    readOnly: false,
});
```

- `width`, `height` : Size of checkbox.
- Box fill style
    - `color`, `boxFillAlpha` : Box color and alpha of checked        
    - `uncheckedColor`, `uncheckedBoxFillAlpha` : : Box color and alpha of unchecked
- Box stroke style
    - `boxLineWidth`, `boxStrokeColor`, `boxStrokeAlpha` : Box stroke color and alpha of checked.
    - `uncheckedBoxStrokeColor`, `uncheckedBoxStrokeAlpha` : Box stroke color and alpha of unchecked.
- Checker style
    - `checkerColor`, `checkerAlpha` : Checker color and alpha
- `circleBox` : Shape of box
    - `false` : Rectangle shape box. Default behavior.
    - `true` : Circle shape box    
- `animationDuration` : Duration of drawing path of checker.
- `checked` : Initial value of checked.
- `readOnly` : Set `ture` to disable input.

### Custom class

- Define class
    ```javascript
    class MyCheckbox extends RexPlugins.GameObjects.Checkbox {
        constructor(scene, x, y, width, height, color, config) {
            super(scene, x, y, width, height, color, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var checkbox = new MyCheckbox(scene, x, y, width, height, color, config);
    ```

### Check

- Get
    ```javascript
    var checked = checkbox.checked;
    // var checked = checkbox.value;
    ```
- Set
    - Check
        ```javascript
        checkbox.setChecked();
        // checkbox.setChecked(true);
        // checkbox.setValue(true);
        ```
        or
        ```javascript
        checkbox.checked = true;
        // checkbox.value = true;
        ```
    - Uncheck
        ```javascript
        checkbox.setChecked(false);
        // checkbox.setValue(false);
        ```
        or
        ```javascript
        checkbox.checked = false;
        // checkbox.value = false;
        ```
    - Toggle
        ```javascript
        checkbox.toggleChecked();
        // checkbox.setValue(!checkbox.checked);
        ```
        or
        ```javascript
        checkbox.checked = !checkbox.checked;
        // checkbox.value = !checkbox.value;
        ```

### Read only

- Get
    ```javascript
    var readOnly = checkbox.readOnly;
    ```
- Set
    ```javascript
    checkbox.setReadOnly();
    // checkbox.setReadOnly(true);
    ```
    or
    ```javascript
    checkbox.readOnly = true;
    ```

### Box fill style

- Get
    ```javascript
    var color = checkbox.boxFillColor;
    var alpha = checkbox.boxFillAlpha;
    ```
    ```javascript
    var color = checkbox.uncheckedBoxFillColor;
    var alpha = checkbox.uncheckedBoxFillAlpha;
    ```
- Set
    ```javascript
    checkbox.setBoxFillStyle(color, alpha);
    // checkbox.boxFillColor = color;
    // checkbox.boxFillAlpha = alpha;
    ```
    ```javascript
    checkbox.setUncheckedBoxFillStyle(color, alpha);
    // checkbox.uncheckedBoxFillColor = color;
    // checkbox.uncheckedBoxFillAlpha = alpha;
    ```
### Box stroke style

- Get
    ```javascript
    var lineWidth = checkbox.boxLineWidth;
    var color = checkbox.boxStrokeColor;
    var alpah = checkbox.boxStrokeAlpha;
    ```
    ```javascript
    var lineWidth = checkbox.uncheckedBoxLineWidth;
    var color = checkbox.uncheckedBoxStrokeColor;
    var alpah = checkbox.uncheckedBoxStrokeAlpha;
    ```
- Set
    ```javascript
    checkbox.setBoxStrokeStyle(lineWidth, color, alpha);
    // checkbox.boxLineWidth = lineWidth;
    // checkbox.boxStrokeColor = color;
    // checkbox.boxStrokeAlpha = alpha;
    ```
    ```javascript
    checkbox.setUncheckedBoxStrokeStyle(lineWidth, color, alpha);
    // checkbox.uncheckedBoxLineWidth = lineWidth;
    // checkbox.uncheckedBoxStrokeColor = color;
    // checkbox.uncheckedBoxStrokeAlpha = alpha;
    ```

### Checker style

- Get
    ```javascript
    var color = checkbox.checkerColor;
    var alpha = checkbox.checkAlpha;
    ```
- Set
    ```javascript
    checkbox.setCheckerStyle(color, alpha);
    // checkbox.checkerColor = color;
    // checkbox.checkAlpha = alpha;
    ```

### Checker animation

- Duration
    - Get
        ```javascript
        var duration = checkbox.checkerAnimDuration;
        ```
    - Set
        ```javascript
        checkbox.setCheckerAnimDuration(duration);
        checkbox.checkerAnimDuration = duration;
        ```

### Size

- Get
    ```javascript
    var width = checkbox.width;
    var height = checkbox.height;
    ```
- Set
    ```javascript
    checkbox.setSize(width, height);
    ```
    or
    ```javascript
    checkbox.width = width;
    checkbox.height = height;
    ```

### Display size

- Get
    ```javascript
    var width = checkbox.displayWidth;
    var height = checkbox.displayHeight;
    ```
- Set
    ```javascript
    checkbox.setDisplaySize(width, height);
    ```
    or
    ```javascript
    checkbox.displayWidth = width;
    checkbox.displayHeight = height;
    ```

### Events

- On value change
    ```javascript
    checkbox.on('valuechange', function(value) {
        // value: checked
    })
    ```

### Other properties

See [game object](gameobject.md)
