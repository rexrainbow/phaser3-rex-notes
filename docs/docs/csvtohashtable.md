## Introduction

Hash table indexed by (col-key, row-key) from csv string.

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/csv-to-hash-table)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcsvtohashtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcsvtohashtableplugin.min.js', true);
    ```
- Add hash-table object
    ```javascript
    var table = scene.plugins.get('rexcsvtohashtableplugin').add();
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CsvToHashTablePlugin from 'phaser3-rex-plugins/plugins/csvtohashtable-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCsvToHashTable',
                plugin: CsvToHashTablePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add hash-table object
    ```javascript
    var table = scene.plugins.get('rexCsvToHashTable').add();
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CsvToHashTable from 'phaser3-rex-plugins/plugins/csvtohashtable.js';
    ```
- Add hash-table object
    ```javascript
    var table = new CsvToHashTable();
    ```

### Create instance

```javascript
var table = scene.plugins.get('rexCsvToHashTable').add();
```

### Append rows from csv string

```javascript
table.loadCSV(csvString, {
    // delimiter: ',',
    // convert: true
    // convertScope: undefined
});
```

For exameple, csv string

|name |hp |mp|
|-----|---|--|
|Rex  |100|20|
|Alice|300|40|

```raw
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

Values will be converted to *number*, *boolean*, *null*, or *string*, if `convert` is `true`, or assign your convert function by `convert` and `convertScope` when loading table (`table.loadCSV(...)`).

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
var existed = table.isValueInRol(rowKey, value);
```

```javascript
var existed = table.isValueInCol(colKey, value);
```

### Create table

#### Clear table

```javascript
table.clear();
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
table.appendRow(rowKey, initValue);
// table.appendRow(rowKey, callback, scope);  // get initValue from callback
```

Callback

```javascript
var callback = function (table, rowKey, colKey) { 
    // value = ...
    return value;
};
```

#### Remove a column

```javascript
table.removeCol(colKey);
```

#### Remove a row

```javascript
table.removeRol(rowKey);
```

### Sort column or row

```javascript
table.sortCol(colKey, mode);
// table.sortCol(callback, scope);  // sort columns by callback
```

```javascript
table.sortRow(rowKey, mode);
// table.sortRow(callback, scope);  // sort rows by callback
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

### JSON

- Table to json
    ```javascript
    var jsonData = table.toJSON();
    ```
- Reset table by JSON
    ```javascript
    table.resetFromJSON(jsonData);
    ```