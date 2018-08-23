## Introduction

Display text page by page on text object, [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).

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
    //wrap: false     // set true to add '\n' in each line end
});
```

Properties

- text: content in string or array, optional

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

```javascript
page.showPage();         // display current page
page.showNextPage();     // display next page
page.showPreviousPage(); // display previous page
```

Initial page index is `-1`, so user could call `page.showNextPage()` to display first page.

### Get lines of page

```javascript
var lines = page.getPage();         // get lines of current page
var lines = page.getNextPage();     // get lines of next page
var lines = page.getPreviousPage(); // get lines of previous page
```

### Other properties

- Current page index : `page.pageIdx`
- Number of pages : `page.pageCount`
- Is last page: `page.isLastPage`
- Is first page: `page.isFirstPage`