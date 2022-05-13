## Introduction

A container with pages, only current page is visible.

- Author: Rex
- Game object

## Live demos

- [Pages](https://codepen.io/rexrainbow/pen/vPWzBa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-pages)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add pages object
    ```javascript
    var pages = scene.rexUI.add.pages(config);
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
- Add pages object
    ```javascript
    var pages = scene.rexUI.add.pages(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Pages } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add pages object
    ```javascript    
    var pages = new Pages(scene, config);
    scene.add.existing(pages);
    ```

### Add pages object

```javascript
var pages = scene.rexUI.add.pages({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // space: { left: 0, right:0, top:0, bottom:0 },
    // swapMode: 0,

    // name: '',
    // draggable: false,
    // sizerEvents: false,
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
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
- `swapMode` : Set to invisible or destroy swapped page.
    - 0, `'invisible'` : Set swapped page to invisible.
    - 1, `'destroy'` : Destroy swapped page.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyPages extends RexPlugins.UI.Pages {
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
    var pages = new MyPages(scene, config);
    ```

### Add background

```javascript
pages.addBackground(child);
```

or

```javascript
pages.addBackground(child, {left: 0, right: 0, top: 0, bottom: 0}, key);
```

- `left`, `right`, `top`, `bottom` : Extra padded space. Default is 0.
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

### Add page

```javascript
pages.addPage(child, key, align, padding, expand);
// pages.add(child, key, align, padding, expand);
```

or 

```javascript
pages.addPage(child, 
    {
        key: 0,
        align: Phaser.Display.Align.TOP_LEFT,
        padding: {left: 0, right: 0, top: 0, bottom: 0}, 
        expand: true
    }
);
// pages.add(child, config);
```

- `child` : A game object.
- `key` : Unique name of this page.
- `align` :
    - `'left-top'`, or `Phaser.Display.Align.TOP_LEFT` : Align game object at left-top. Default value.
    - `'left-center'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
    - `'left-bottom'`, or `Phaser.Display.Align.LEFT_BOTTOM` : Align game object at left-bottom.
    - `'center-top'`, or `Phaser.Display.Align.TOP_CENTER` : Align game object at center-top.
    - `'center-center'`, or `Phaser.Display.Align.CENTER` : Align game object at center-center.
    - `'center-bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at center-bottom.
    - `'right-top'`, or `Phaser.Display.Align.TOP_RIGHT` : Align game object at right-top.
    - `'right-center'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `'right-bottom'`, or `Phaser.Display.Align.RIGHT_BOTTOM` : Align game object at right-bottom.
- `padding` : Add space between bounds. Default is 0.
    - A number for left/right/top/bottom bounds,
    - Or a plain object.
        ```javascript
        {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        ```
- `expand` : Expand width and height of the page.
    - `true` : Expand width and height.
    - `false` : Don't expand width or height.
    - A plain object, to expand width or height
        ```javascript
        {
            width: true,
            height: true
        }
        ```
        - `expand.width` : Expand width.
        - `expand.height` : Expand height.

### Swap to page

```javascript
pages.swapPage(key);
```

- `key` : Unique name of this page.

!!! note
    This method will run `pages.layout()` to arrange position of current page.

### Page name

- Current page name
    ```javascript
    var pageName = pages.currentKey;
    ```

- Previous page name
    ```javascript
    var pageName = pages.previousKey;
    ```
- Name of all pages
    ```javascript
    var names = pages.keys;
    ```

### Page object

- Get page object
    ```javascript
    var pageObject = pages.getPage(key);
    ```
    - `pageObject` : A game object or `null`.
- Current page object
    ```javascript
    var pageObject = pages.currentPage;
    ```
- Previous page object
    ```javascript
    var pageObject = pages.previousPage;
    ```

### Get element

- Get element
    - All page game objects
        ```javascript
        var gameObjects = pages.getElement('items');
        ```
- Get by name
    ```javascript
    var gameObject = pages.getElement('#' + name);
    // var gameObject = pages.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = pages.getByName('#' + name);
    // var gameObject = pages.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [base sizer object](ui-basesizer.md).

### Events

- Set page invisible, triggered when page is swapped out.
    ```javascript
    pages.on('pageinvisible', function(pageObject, key, pages) {
        // ...
    }, scope);
    ```
    - `pageObject` : Game object of page.
    - `key` : Page name.
    - `pages` : Pages object
- Set page visible, triggered when page is shown.
    ```javascript
    pages.on('pagevisible', function(pageObject, key, pages) {
        // ...
    }, scope);
    ```
    - `pageObject` : Game object of page.
    - `key` : Page name.
    - `pages` : Pages object