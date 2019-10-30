## Introduction

A container with pages, only current page is visible.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/pages/Pages.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-pages)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

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

### Add pages object

```javascript
var pages = scene.rexUI.add.pages({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // name: '',
    // draggable: false
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width`, `height` : Minimum width, minimum height.
- `name` : Set name of this pages.

### Custom class

- Define class
    ```javascript
    class MyPages extends RexPlugins.UI.Pages {
        constructor(scene, config) {
            super(scene, config);
            // ...
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
gridSizer.addBackground(child);
```

### Add page

```javascript
pages.addPage(child, key, align, paddingConfig, expand);
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
- `paddingConfig` : Add space between bounds. Default is 0.
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
- `expand` : Set `true` to expand width and height.

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