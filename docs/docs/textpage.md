## Introduction

Display text page by page on [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).

- Author: Rex
- Behavior of text object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/textpage-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rextextpageplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/textpage)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexTextPage from './plugins/textpage.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import TextPagePlugin from './plugins/textpage-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexTextPage',
            plugin: TextPagePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var txt = scene.add.text(x, y, '', {
    wordWrap:  {
        width: 500
    },
    maxLines: 7
});
var page = scene.plugins.get('rexTextPage').add(txt, {
    //text: '',       // content in string or array
});
```

- `text` : content in string or array, optional

### Set content

- Set text
    ```javascript
    page.setText(text);   // content in string or array
    ```
- Append text
    ```javascript
    page.appendText(text); // content in string or array
    ```

### Show page

- Display current page
    ```javascript
    page.showPage();
    ```
- Display next page
    ```javascript
    page.showNextPage();
    ```
- Display previous page
    ```javascript
    page.showPreviousPage();
    ```

!!! note
    Initial page index is `-1`, so user could call `page.showNextPage()` to display first page.

### Get lines of page

- Get lines of current page
    ```javascript
    var lines = page.getPage();
    ```
- Get lines of next page
    ```javascript
    var lines = page.getNextPage();
    ```
- Get lines of previous page
    ```javascript
    var lines = page.getPreviousPage();
    ```

### Other properties

- Is last page
    ```javascript
    var isLastPage = page.isLastPage;
    ```
- Is first page
    ```javascript
    var isLastPage = page.isFirstPage;
    ```
- Current page index
    ```javascript
    var pageIndex = page.pageIndex;
    ```
- Number of pages
    ```javascript
    var pageIndex = page.pageCount;
    ```