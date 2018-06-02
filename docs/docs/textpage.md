## Introduction

Display text page by page on text object, [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).

- Author: Rex
- Member of text object

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/textpage/TextPagePlugin.js)

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
txt.page = scene.plugins.get('rexTextPage').add(txt, {
    //text: '',       // content in string or array
    //wrap: false     // set true to add '\n' in each line end
});
```

Properties

- text: content in string or array, optional

### Set content

```javascript
txt.page.setText(text);   // content in string or array
```

- Append text

```javascript
txt.page.appendText(text); // content in string or array
```

### Show page

```javascript
txt.page.showPage();         // display current page
txt.page.showNextPage();     // display next page
txt.page.showPreviousPage(); // display previous page
```

Initial page index is `-1`, so user could call `txt.page.showNextPage()` to display first page.

### Get lines of page

```javascript
var lines = txt.page.getPage();         // get lines of current page
var lines = txt.page.getNextPage();     // get lines of next page
var lines = txt.page.getPreviousPage(); // get lines of previous page
```

### Other properties

- Current page index : `txt.page.pageIdx`
- Number of pages : `txt.page.pageCount`
- Is last page: `txt.page.isLastPage`
- Is first page: `txt.page.isFirstPage`