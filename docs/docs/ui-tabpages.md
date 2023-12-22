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
    wrapTabs: false,
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

    // space: { left:0, right:0, top:0, bottom:0, item:0 },

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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
- `tabPosition` : Put tabs at top, bottom, left, right of pages.
    - `'top'`, `'bottom'`, `'left'`, `'right'` : Default value is `'top'`.
- `wrapTabs` :
    - `false` : Uses [Buttons](ui-buttons.md) as Tabs, default behavior.
    - `true` : 
        - Using [FixWidthButtons](ui-fixwidthbuttons.md) as Tabs, if `tabPosition` is `'top'` or `'bottom'`. 
        - Using [Buttons](ui-buttons.md) as Tabs, if `tabPosition` is `'left'` or `'right'`    
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
    - `expand.tabs` : Set `true` to expand width/height of tabs. Default value is `false`.
- `align` :
    - `align.tabs` :  
        - `'left'`. `'right'`, `'center'` : Align tabs to left/right/center side when `tabPosition` is `'top'` or `'bottom'`.
        - `'top'`. `'bottom'`, `'center'` : Align tabs to top/bottom/center side when `tabPosition` is `'left'` or `'right'`.
- `space` :
    - An object: Padding of button game objects.
        - `space.top`, `space.bottom`, `space.left`, `space.right` : Padding around bottons.
        - `space.item` : Space between tabs and pages.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyTabPages extends RexPlugins.UI.TabPages {
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
    var tabPages = new MyTabPages(scene, config);
    ```

### Add page

Add a tab/page to last of tabs/pages.

```javascript
tabPages.addPage(key, tabGameObject, pageGameObject).layout();
```

or 

```javascript
tabPages.addPage({
    // key: undefined,
    tab: tabGameObject,
    page: pageGameObject
}).layout();
```

- `key` : Unique string name of this page.
    - `undefined` : Create an [UUID](uuid.md) for key.
- `tab` : A game object, will put it into tabs.
- `page` : A game object, will put it into pages.

!!! note
    Invoke `tabPages.layout()` after adding pages.

### Swap to page

- Swap to related page when clicking tab.
- Swap to page by key/index
    ```javascript
    tabPages.swapPage(key);
    ```
    ```javascript
    tabPages.swapPage(index);
    ```
    - `key` : Unique string name of the page.
    - `index` : Index number in tabs.
- Swap to first page
    ```javascript
    tabPages.swapFirstPage();
    ```
- Swap to last page
    ```javascript
    tabPages.swapLastPage();
    ```
- Swap page without fade-in transition
    ```javascript
    tabPages.swapPage(key, 0);
    ```
    ```javascript
    tabPages.swapPage(index, 0);
    ```
    ```javascript
    tabPages.swapFirstPage(0);
    ```
    ```javascript
    tabPages.swapLastPage(0);
    ```

### Remove page

- Remove page
    ```javascript
    tabPages.removePage(key);
    ```
    ```javascript
    tabPages.removePage(index);
    ```
- Remove and destroy page
    ```javascript
    tabPages.removePage(key, true);
    ```
    ```javascript
    tabPages.removePage(index, true);
    ```
- Remove all pages
    ```javascript
    tabPages.removeAllPages();
    ```
- Remove and destroy all pages
    ```javascript
    tabPages.removeAllPages(true);
    ```

### Get element

- Get element
    - [Pages](ui-pages.md)
        ```javascript
        var gameObject = tabPages.getElement('pages');
        ```
    - Tabs, a [buttons](ui-buttons.md)
        ```javascript
        var gameObject = tabPages.getElement('tabs');
        ```
    - Page by key/index
        ```javascript
        var gameObject = tabPages.getPage(key);
        ```
        ```javascript
        var gameObject = tabPages.getPage(index);
        ```
        - `key` : Unique string name of the page.
        - `index` : Index number in tabs.
    - Tab by key/index
        ```javascript
        var gameObjects = tabPages.getTab(key);
        ```
        ```javascript
        var gameObjects = tabPages.getTab(index);
        ```
        - `key` : Unique string name of the page.
        - `index` : Index number in tabs.
- Get by name
    ```javascript
    var gameObject = tabPages.getElement('#' + name);
    // var gameObject = pages.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = tabPages.getByName(name);
    // var gameObject = tabPages.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [base sizer object](ui-basesizer.md), [container-lite](containerlite.md), [Pages](ui-pages.md), [Buttons](ui-buttons.md)

### Events

- When swapping to a page by clicking tab, or `tabPages.swapPage(key)`
    ```javascript
    pages.on('tab.focus', function(tab, key) {
        // ...
    }, scope);
    pages.on('page.focus', function(page, key) {
        // ...
    }, scope);
    ```
    ```javascript
    pages.on('tab.blur', function(tab, key) {
        // ...
    }, scope);
    pages.on('page.blur', function(page, key) {
        // ...
    }, scope);    
    ```
    - `tab` : Game object of tab.
    - `page` : Game object of page.
    - `key` : Unique string name of the page.
