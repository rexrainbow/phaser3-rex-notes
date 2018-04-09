## Introduction

Hash table indexed by (col-key, row-key) from csv string.

- Author: Rex
- Member of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/csvtohashtable/CsvToHashTable.js)

## Usage

### Create instance

```javascript
var table = new HashTable(this);
```

### Load table from csv string

```javascript
table.loadCSV(csvString);
// table.loadCSV(csvString, delimiter);
```

All values in table are string after loading.

### Convert value type

- Convert all values
    ```javascript
    table.convert();  // convert true, false, null, number
    // table.convert(callback, scope); // convert by custom function
    // callback = function(table, colKey, rowKey, value) {};
    ```
- convert values in column
    ```javascript
    table.convertCol(colKey);  // colKey: a colKey, or an array of colKeys
    // table.convertCol(colKey, callback, scope);
    // callback = function(table, colKey, rowKey, value) {};
    ```
- convert values in row
    ```javascript
    table.convertRow(rowKey);  // rowKey: a rowKey, or an array of rowKeys
    // table.convertRow(rowKey, callback, scope);
    // callback = function(table, colKey, rowKey, value) {};
    ```

### Get value

```javascript
var val = table.get(colKey, rowKey);
```

### Set value

```javascript
table.set(colKey, rowKey, value);
```

```javascript
table.add(colKey, rowKey, value);
// equal to table.set(colKey, rowKey, table.get(colKey, rowKey) + value);
```

### Has column/row key

```javascript
var hasRow = table.hasColKey(colKey);
```

```javascript
var hasRow = table.hasRowKey(rowKey);
```

```javascript
var hasRow = table.hasKey(colKey, rowKey);
```

### Value in column or row

```javascript
var hasValue = table.isValueInCol(colKey, data);
```

```javascript
var existed = table.isValueInRol(rowKey, data);
```

### Create table

#### Clean table

```javascript
table.clean();
```

#### Append a column

```javascript
table.appendCol(colKey, initValue);
// table.appendCol(colKey, callback, scope);  // get initValue from callback
// callback = function (table, colKey, rowKey) { }
```

#### Append a row

```javascript
table.appendRow(colKey, initValue);
// table.appendRow(colKey, callback, scope);  // get initValue from callback
// callback = function (table, colKey, rowKey) { }
```

#### Remove a column

```javascript
table.removeCol(colKey);
```

#### Remove a row

```javascript
table.removeRol(colKey);
```

### Sort column or row

```javascript
table.sortCol(colKey, mode); // mode: 'ascending'|0|'descending'|1|'logical ascending'|2|'logical descending'|3
// table.sortCol(callback, scope);  // sort column by callback
// callback = function(rowKeyA, rowKeyB) {}
```

```javascript
table.sortRow(rowKey, mode); // mode: 'ascending'|0|'descending'|1|'logical ascending'|2|'logical descending'|3
// table.sortRow(callback, scope);  // sort column by callback
// callback = function(colKeyA, colKeyB) {}
```

### Retrieve columns or rows

```javascript
table.eachCol(rowKey, callback, scope);
// callback = function(table, colKey, rowKey, value) {}
```

```javascript
table.eachRow(colKey, callback, scope);
// callback = function(table, colKey, rowKey, value) {}
```