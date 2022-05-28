## Introduction

A container with [tabs](ui-buttons.md) and [pages](ui-pages.md), only current page is visible.

- Author: Rex
- Game object

## Live demos

- [Tabpage](https://codepen.io/rexrainbow/pen/gOvoGVy)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-tabpages)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add tab-pages object
    ```javascript
    var tabPages = scene.rexUI.add.tabPages(config);
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
- Add tab-pages object
    ```javascript
    var tabPages = scene.rexUI.add.tabPages(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { TabPages } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add tab-pages object
    ```javascript    
    var tabPages = new TabPages(scene, config);
    scene.add.existing(tabPages);
    ```

### Add tab-pages object

```javascript
var tabPages = scene.rexUI.add.tabPages({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // background: backgroundGameObject,

    tabPosition: 'top',
    tabs: {
        // width:
        // height:
        // rtl:

        // background: backgroundGameObject,
        expand:
        align:
        click: {
            mode: 'pointerup',
            clickInterval: 100
        },
        space: { left: 0, right:0, top:0, bottom:0, item:0 }
    },

    pages: {
        space: { left: 0, right:0, top:0, bottom:0 },
        fadeIn: 0,
    },

    expand: {
        tabs: false,
    },

    align: {
        tabs: 'left',
    },

    // space: { left: 0, right:0, top:0, bottom:0 },

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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
- `tabPosition` : Put tabs at top, bottom, left, right of pages.
    - `'top'`, `'bottom'`, `'left'`, `'right'` : Default value is `'top'`.
- `tabs` : Configuration of tabs, which is a [buttons game object](ui-buttons.md#add-buttons-object).
    - `tabs.width`, `tabs.height` : Minimum width, minimum height of tabs, to preserve space if tabs is empty, optional.
    - `tabs.rtl` : 
        - `true` : Layout buttons from right to left.
        - `false` : Layout buttons from left to right. Default behavior.
    - `tabs.background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of grid table.
    - `tabs.space` : 
        - `tabs.space.top`, `tabs.space.bottom`, `tabs.space.left`, `tabs.space.right` : Padding around bottons.
        - `tabs.space.item` : Space between 2 button game objects.
    - `tabs.expand` : Set `true` to expand width, or height of tabs game objects.  
    - `tabs.click`: Configuration of [button clicking](button.md).
        - `tabs.click.mode` :
            - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
            - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
        - `tabs.click.clickInterval` : Interval between 2 'click' events, in ms.
- `pages` : Configuration of [pages](ui-pages.md#add-pages-object)
    - `pages.space` : Pads spaces.
        - `pages.space.left`, `pages.space.right`, `pages.space.top`, `pages.space.bottom` : Space of bounds.
    - `pages.fadeIn` : Fade-in duration of current page.
        - `0` : No fade-in effect. Default behavior.
- `expand` :
    - `tabs` : Set `true` to expand width/height of tabs. Default value is `false`.
- `align` :
    - `tabs` :  
- `space` :
    - An object: Padding of button game objects.
        - `space.top`, `space.bottom`, `space.left`, `space.right` : Padding around bottons.
        - `space.item` : Space between 2 button game objects.
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

### Fade in duration

```javascript
pages.setFadeInDuration(duration);
```

- `0` : No fade-in effect.

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