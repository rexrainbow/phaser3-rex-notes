## Introduction

Display text page by page on text object.

- Author: Rex
- A plugin of text object

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/textpage/TextPagePlugin.js)

## Usage

### Create instance

```javascript
var wordWrap = {
    width: 500
};
var txt = scene.add.text(x, y, '', {
    wordWrap: wordWrap,
    maxLines: 7
});
txt.page = new TextPagePlugin(txt, {
    //text: '',       // content in string or array
    //wordWrap: wordWrap
});
```

Properties

- text: content in string or array, optional
- wordWrap: the same as `wordWrap` of text style, which included
    - width
    - callback
    - callbackScope
    - useAdvancedWrap

#### Word wrap

Assign `wordWrap` in page object, otherwise this page object will get wordWrap from text object.

WordWrap properties of text objecct will be moved to page object to avoid word-wrapping again when displaying text.

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
- Number of pages : `txt.page.pageNum`
- Is last page: `txt.page.isLastPage`
- Is first page: `txt.page.isFirstPage`

### Set wordWrap properties

- Width: `txt.page.setWordWrapWidth(width)`
- Callback: `txt.page.setWordWrapCallback(callback, callbackScope)`
- UseAdvanced: `txt.page.setWordWrapUseAdvanced(true)`