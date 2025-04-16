## Introduction

Layout elements in [Holy grail](https://en.wikipedia.org/wiki/Holy_grail_(web_design)) style.

- Author: Rex
- Game object

## Live demos

- [Simple](https://codepen.io/rexrainbow/pen/abEMByR)
- [Align](https://codepen.io/rexrainbow/pen/GRyeboN)
- [Layout modes](https://codepen.io/rexrainbow/pen/YzjVYNq)
- [Change layout mode](https://codepen.io/rexrainbow/pen/GReJYKY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-holygrail)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add holy-grail object
    ```javascript
    var holyGrail = scene.rexUI.add.holyGrail(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add holy-grail object
    ```javascript
    var holyGrail = scene.rexUI.add.holyGrail(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { HolyGrail } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add holy-grail object
    ```javascript    
    var holyGrail = new HolyGrail(scene, config);
    scene.add.existing(holyGrail);
    ```

### Add holyGrail object

```javascript
var holyGrail = scene.rexUI.add.holyGrail({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    layoutMode: 0,

    // Elements
    background: backgroundGameObject,

    header: headerGameObject,

    leftSide: leftSideGameObject,

    content: contentGameObject,

    rightSide: rightSideGameObject,

    footer: footerGameObject,

    // Space
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        header: 0,  // {left, right, top, bottom}
        footer: 0,  // {left, right, top, bottom}
        leftSide: 0, // {left, right, top, bottom}
        rightSide: 0, // {left, right, top, bottom}
    },

    // proportion: {
    //     header: 0,
    //     footer: 0,
    //     leftSide: 0,
    //     rightSide: 0,
    //     content: 1,
    // },

    // expand: {
    //     header: true,
    //     footer: true,
    //     leftSide: true,
    //     rightSide: true,
    //     content: false,
    // },

    // align: {
    //     header: 'center',
    //     footer: 'center',
    //     leftSide: 'center',
    //     rightSide: 'center',
    //     content: 'center',
    // },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `layoutMode` : Expand left side, right side to bottom row.
    - `0`, or `'FFF'` : [Bottom row is footer](ui-holygrail.md#mode-0). Default behavior
    - `1`, or `'LFF'` : [Left side will expand down to bottom row](ui-holygrail.md#mode-1).
    - `2`, or `'FFR'` : [Right side will expand down to bottom row](ui-holygrail.md#mode-2).
    - `3`, or `'LFR'` : [Left side and right side will expand down to bottom row](ui-holygrail.md#mode-3).
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of holyGrail.
- `header` : Game object of header, optional.
    - Will fixed height (`proportion=0`) and expand width (`expand=true`) width default setting.
- `leftSide` : Game object of leftSide, optional.
    - Will fixed width (`proportion=0`) and expand height (`expand=true`) width default setting.
- `content` : Game object of content, optional.
    - Will expand width (`proportion=1`) and expand height (`expand=true`) width default setting. 
- `rightSide` : Game object of rightSide, optional.
    - Will fixed width (`proportion=0`) and expand height (`expand=true`) width default setting.
- `footer` : Game object of footer, optional.
    - Will fixed height (`proportion=0`) and expand width (`expand=true`) width default setting.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.header` : 
        - A number : Space between header game object and below game object, equal to `{bottom}`
        - `{left, right, top, bottom}` : Padding values of header game object.
    - `space.footer` 
        - A number : Space between footer game object and above game object, equal to `{top}`
        - `{left, right, top, bottom}` : Padding values of footer game object.
    - `space.leftSide` : 
        - A number : Space between leftSide game object and content game object, equal to `{right}`
        - `{left, right, top, bottom}` : Padding values of leftSide game object.
    - `space.rightSide` : 
        - A number : Space between rightSide game object and content game object, equal to `{left}`
        - `{left, right, top, bottom}` : Padding values of rightSide game object.
- `expand` : Expand width or height of element
    - `expand.header` : Set `true` to expand width of header game object. Default is `true`.
    - `expand.footer` : Set `true` to expand width of footer game object. Default is `true`.
    - `expand.leftSide` : Set `true` to expand height of leftSide game object. Default is `true`.
    - `expand.rightSide` : Set `true` to expand height of rightSide game object. Default is `true`.
    - `expand.content` : Set `true` to expand height of content game object. Default is `true`.
- `proportion` : Fixed width or height of element
    - `proportion.header` : 
        - `0` : Fixed height. Default behavior.
        - `1`, or other numbers : Expand height.
    - `proportion.footer` :
        - `0` : Fixed height. Default behavior.
        - `1`, or other numbers : Expand height.
    - `proportion.leftSide` :
        - `0` : Fixed width. Default behavior.
        - `1`, or other numbers : Expand width.
    - `proportion.rightSide` :
        - `0` : Fixed width. Default behavior.
        - `1`, or other numbers : Expand width.
    - `proportion.content` :
        - `0` : Fixed width.
        - `1`, or other numbers : Expand width. Default value is `1`.
- `align` : Align element
    - `align.header`
    - `align.footer`
    - `align.leftSide`
    - `align.rightSide`
    - `align.content`
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`..
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).

### Custom class

- Define class
    ```javascript
    class MyHolyGrail extends RexPlugins.UI.HolyGrail {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var holyGrail = new MyHolyGrail(scene, config);
    ```

### Layout modes

#### Mode 0

Bottom row is footer. Default behavior.

<table border="1px solid black">
 <tr>
  <td colspan="3" align="center" valign="center">Header</td>
 </tr>
 <tr>
  <td>Left side</td>
  <td>Content</td>
  <td>Right side</td>
 </tr>
 <tr>
  <td colspan="3" align="center" valign="center">Footer</td>
 </tr>
</table>

#### Mode 1

Left side will expand down to bottom row.

<table border="1px solid black">
 <tr>
  <td colspan="3" align="center" valign="center">Header</td>
 </tr>
 <tr>
  <td rowspan="2" align="center" valign="center">Left side</td>
  <td>Content</td>
  <td>Right side</td>
 </tr>
 <tr>
  <td colspan="2" align="center" valign="center">Footer</td>
 </tr>
</table>

#### Mode 2

Right side will expand down to bottom row.

<table border="1px solid black">
 <tr>
  <td colspan="3" align="center" valign="center">Header</td>
 </tr>
 <tr>
  <td>Left side</td>
  <td>Content</td>
  <td rowspan="2" align="center" valign="center">Right side</td>
 </tr>
 <tr>
  <td colspan="2" align="center" valign="center">Footer</td>
 </tr>
</table>

#### Mode 3

Left side and right side will expand down to bottom row.

<table border="1px solid black">
 <tr>
  <td colspan="3" align="center" valign="center">Header</td>
 </tr>
 <tr>
  <td rowspan="2" align="center" valign="center">Left side</td>
  <td>Content</td>
  <td rowspan="2" align="center" valign="center">Right side</td>
 </tr>
 <tr>
  <td>Footer</td>
 </tr>
</table>


### Layout children

Arrange position of all elements.

```javascript
holyGrail.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Re-build

Destroy current elements then add elements with new config.

```javascript
holyGrail
    .build({
        // Elements
        background: backgroundGameObject,
    
        header: headerGameObject,
    
        leftSide: leftSideGameObject,
    
        content: contentGameObject,
    
        rightSide: rightSideGameObject,
    
        footer: footerGameObject,
    
        layoutMode: 0,
    
        // Space
        space: {        
            header: 0,  // {left, right, top, bottom}
            footer: 0,  // {left, right, top, bottom}
            leftSide: 0, // {left, right, top, bottom}
            rightSide: 0, // {left, right, top, bottom}
        },
    
        // proportion: {
        //     header: 0,
        //     footer: 0,
        //     leftSide: 0,
        //     rightSide: 0,
        //     content: 1,
        // },
    
        // expand: {
        //     header: true,
        //     footer: true,
        //     leftSide: true,
        //     rightSide: true,
        //     content: false,
        // },
    
        // align: {
        //     header: 'center',
        //     footer: 'center',
        //     leftSide: 'center',
        //     rightSide: 'center',
        //     content: 'center',
        // },
    })
    .layout()
```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = holyGrail.getElement('background');
        ```
    - Header game object
        ```javascript
        var header = holyGrail.getElement('header');
        ```
    - Left-side game object
        ```javascript
        var leftSide = holyGrail.getElement('leftSide');
        ```
    - Content game object
        ```javascript
        var content = holyGrail.getElement('content');
        ```
    - Right-side game object
        ```javascript
        var rightSide = holyGrail.getElement('rightSide');
        ```    
    - Footer game object
        ```javascript
        var footer = holyGrail.getElement('footer');
        ```
- Get by name
    ```javascript
    var gameObject = holyGrail.getElement('#' + name);
    // var gameObject = holyGrail.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = holyGrail.getByName(name);
    // var gameObject = holyGrail.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.
