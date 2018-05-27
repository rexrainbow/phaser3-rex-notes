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
table.loadCSV(csvString, {
    // delimiter: ',',
    // convert: true,
    // convertCallback: undefined
    // convertCallbackScope: undefined
});
```

For exameple, csv string

```json
name,hp,mp
Rex,100,20
Alice,300,40
```

will be converted to 

```json
{
    "Alice": {
        "name": "Alice",
        "hp": 300,
        "mp": 40
    },
    "Rex": {
        "name": "Rex",
        "hp": 100,
        "mp": 20
    }
}
```

Then get value by

```javascript
var value = table.get('Rex', 'hp');
```

### Convert value type

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`, or assign your convert function by `convertCallback` and `convertCallbackScope` when loading table (`table.loadCSV(...)`).

```javascript
var convertCallback = function(table, rowKey, colKey, value) {
    // value = ...
    return value;
};
```

Or uses these metheds to convert columns or rows.

- convert values in column
    ```javascript
    table.convertCol(colKey);  // colKey: a colKey, or an array of colKeys
    // table.convertCol(colKey, convertCallback, convertCallbackScope);
    ```
- convert values in row
    ```javascript
    table.convertRow(rowKey);  // rowKey: a rowKey, or an array of rowKeys
    // table.convertRow(rowKey, convertCallback, convertCallbackScope);
    ```

### Get value

```javascript
var val = table.get(rowKey, colKey);
```

### Set value

```javascript
table.set(rowKey, colKey, value);
```

```javascript
table.add(rowKey, colKey, value);
// equal to table.set(rowKey, colKey, table.get(rowKey, colKey) + value);
```

### Has column/row key

```javascript
var hasRow = table.hasRowKey(rowKey);
```

```javascript
var hasCol = table.hasColKey(colKey);
```

```javascript
var hasCell = table.hasKey(rowKey, colKey);
```

### Value in column or row

```javascript
var existed = table.isValueInRol(rowKey, data);
```

```javascript
var existed = table.isValueInCol(colKey, data);
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
```

Callback

```javascript
var callback = function (table, rowKey, colKey) { 
    // value = ...
    return value;
};
```

#### Append a row

```javascript
table.appendRow(colKey, initValue);
// table.appendRow(colKey, callback, scope);  // get initValue from callback
```

Callback

```javascript
var callback = function (table, rowKey, colKey) { 
    // value = ...
    return value;
};
```

#### Remove a row

```javascript
table.removeRol(colKey);
```

#### Remove a column

```javascript
table.removeCol(colKey);
```

### Sort column or row

```javascript
table.sortCol(colKey, mode);
// table.sortCol(callback, scope);  // sort column by callback
```

```javascript
table.sortRow(rowKey, mode);
// table.sortRow(callback, scope);  // sort column by callback
```

Mode:

- `'ascending'`, or `0`
- `'descending'`, or `1`
- `'logical ascending'`, or `2`
- `'logical descending'`, or `3`

Sorting callback

```javascript
var callback = function(rowKeyA, rowKeyB) {
    return result; // 1, -1, or 0
};
```

### Retrieve columns or rows

```javascript
table.eachCol(rowKey, callback, scope);
```

```javascript
table.eachRow(colKey, callback, scope);
```

Callback

```javascript
var callback = function(table, rowKey, colKey, value) {
    // ...
};
```
