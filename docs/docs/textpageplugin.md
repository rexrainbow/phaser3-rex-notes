## Introduction

Display text page by page on text object.

- Author: Rex
- A plugin of text object

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/textpage/TextPagePlugin.js)

## Usage

### Create instance

```javascript
txt.page = new TextPagePlugin(txt, {
    //text: '',       // content in string or array
});
```

Properties

- text: content in string or array

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