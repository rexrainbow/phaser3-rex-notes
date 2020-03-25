## Introduction

List of unique items. Support array and set methods.

- Author: Rex
- Data structure

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/uniqueitemlist)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexuniqueitemlistplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuniqueitemlistplugin.min.js', true);
    ```
- Add list object
    ```javascript
    var listA = scene.plugins.get('rexuniqueitemlistplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UniqueItemListPlugin from 'phaser3-rex-plugins/plugins/uniqueitemlist-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexUniqueItemList',
                plugin: UniqueItemListPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add list object
    ```javascript
    var listA = scene.plugins.get('rexUniqueItemList').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import UniqueItemList from 'phaser3-rex-plugins/plugins/uniqueitemlist.js';
    ```
- Add list object
    ```javascript
    var listA = new UniqueItemList();
    ```

### Create instance

```javascript
var listA = scene.plugins.get('rexUniqueItemList').add({
    // items: undefined,
    // autoCleanup: true
});
```

- `items` : Initial items.
- `autoCleanup` : Set `true` to remove item when item is destroyed (from item's 'destroy' event)

or

```javascript
var listA = scene.plugins.get('rexUniqueItemList').add(items);
```

### Items

- Get first item
    ```javascript
    var item = listA.getFirst();
    ```
- Get last item
    ```javascript
    var item = listA.getLast();
    ```
- Get item at index
    ```javascript
    var item = listA.get(index);
    ```
- Get a random item
    ```javascript
    var item = listA.getRandom();
    ```
- Get items
    ```javascript
    var items = listA.getItems();
    ```
- Clone items to a new array
    ```javascript
    var items = listA.cloneItems();
    ```

#### Item count

- Get item count
    ```javascript
    var count = listA.length;
    ```
- List is empty
    ```javascript
    var isEmpty = listA.isEmpty();
    ```

#### Contains

- Has item
    ```javascript
    var hasItem = listA.contains(item);
    ```
- Has any item
    ```javascript
    var hasAny = listA.any(listB);
    ```
- Has all items
    ```javascript
    var hasAll = listA.all(listB);
    ```

### Array operations

#### Add

- Add to last
    ```javascript
    listA.add(item);
    ```
    or
    ```javascript
    listA.addLast(item);
    ```
- Add to first
    ```javascript
    listA.addFirst(item);
    ```
- Insert to index
    ```javascript
    listA.add(item, index);
    ```
- Insert, or move to index
    ```javascript
    listA.add(item, iindex, true);
    ```
- Add items
    ```javascript
    listA.addMultiple(items);
    ```
- Clone list
    ```javascript
    var newList = listA.clone();
    // listA.clone(listB)
    ```

#### Remove

- Remove item
    ```javascript
    listA.remove(item);
    ```
- Remove first
    ```javascript
    listA.removeFirst();
    ```
- Remove last
    ```javascript
    listA.removeLast();
    ```
- Remove item at index
    ```javascript
    listA.remove(undefined, index);
    ```
- Remove items
    ```javascript
    listA.removeMultiple(items);
    ```
- Remove all items
    ```javascript
    listA.clear();
    ```
- Destroy all items
    ```javascript
    listA.clear(true);
    ```

#### Pop

- Pop first item
    ```javascript
    var item = listA.pop();
    ```
    or
    ```javascript
    var item = listA.popFirst();
    ```
- Pop last item
    ```javascript
    var item = listA.popLast();
    ```
- Pop item at index
   ```javascript
   var item = listA.pop(index);
   ```
- Pop a random item
   ```javascript
   var item = listA.popRandom();
   ```

#### Slice

- Extract items from startIndex to endIndex (item of endIndex is included)
   ```javascript
   var newList = listA.slice(startIndex, endIndex);
   // listA.slice(startIndex, endIndex, listB);
   ```

#### Sort

- Sort
   ```javascript
   list.sort(function(itemA, itemB) {
       if (itemA > itemB) {
           return 1;
       } else if (itemA < itemB) {
           return -1;
       } else {
           return 0;
       }
   })
   ```
- Reverse
   ```javascript
   listA.reverse();
   ```
- Shuffle
   ```javascript
   listA.shuffle();
   ```

### Set operations

- C = A | B
    ```javascript
    var listC = listA.union(listB);
    // listA.union(listB, listC);
    ```
    - `listC` : Result unique-item-list. Can be `listA`, or `listB`.
- C = A & B
    ```javascript
    var listC = listA.intersect(listB);
    // listA.intersect(listB, listC);
    ```
    - `listC` : Result unique-item-list. Can be `listA`, or `listB`.
- C = A - B
    ```javascript
    var listC = listA.difference(listB);
    // listA.difference(listB, listC);
    ```
    - `listC` : Result unique-item-list. Can be `listA`, or `listB`.

### Call method

Apply method of each item.

```javascript
listA.call(fnName, arg0, arg1, arg2, ...);
```

- `fnName` : Method name of item.
- `arg0`, `arg1`, `arg2` : Arguments of `fnName` method.

!!! warning
    Don't add or remove any item during this method.


```javascript
listA.call(function(item, i) {
    // ....
}, scope);
```

- `callback` : A function object.
    ```javascript
    function(item, i) {

    }
    ```