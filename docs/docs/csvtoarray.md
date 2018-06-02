## Introduction

Generate array from csv string.

- Author: [Ben](http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm)
- Method only

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/csvtoarray/CSVToArray.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/csv-to-array)

### Generate array

```javascript
var arr = CSVToArray(csv, {
    // delimiter: ',',
    // convert: true,
    // convertCallback: undefined
    // convertCallbackScope: undefined
});
```

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`, or assign your convert function by `convertCallback` and `convertCallbackScope`.