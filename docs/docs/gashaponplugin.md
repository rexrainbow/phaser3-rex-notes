## Introduction

Pick random item from box.

- Author: Rex
- A plugin of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gashapon/GashaponPlugin.js)

## Usage

### Create instance

```javascript
var gashapon = new GashaponPlugin(scene, {
    mode: 'shuffle',  // 0|'shuffle'|1|'random
    items: {  // name:count
        a:1, 
        b:2, 
        c:3 
    },
    reload: true,     // true|false
});
```

Properties

- mode : 
    - `'shuffle'`, or `0` : pick item from box without put it back.
    - `'random'`, or `1` : pick item from box then put it back.
- reload : set `true` to reload items when box is empty for `shuffle` mode.
- items : initial items in box

### Pick item

#### Pick a random item

```javascript
var item = gashapon.next();
```

- return `null` if pick nothing

#### Pick specific item

```javascript
var item = gashapon.next('a');
```

- return `null` if pick nothing

#### Last picked item

```javascript
var item = gashapon.result;
```

### Set item

#### Set item

```javascript
gashapon.setItem('a', 1);
// gashapon.setItem('a', 1).setItem('b', 2).setItem('c', 3);
```

#### Add item

```javascript
gashapon.addItem('a',1);
```

### Remove item

#### Remove item

```javascript
gashapon.removeItem('a');
// gashapon.removeItem('b').gashapon.removeItem('c');
```

#### Remove all items

```javascript
gashapon.removeAllItems();
```

### Current status

#### Get current status

```javascript
var status = gashapon.toJSON();
```

#### Clone object

```javascript
var status = gashapon.toJSON();
var gashapon2 = new Gashapon(status);
```

#### Overwrite current status

```javascript
var status = gashapon.toJSON();
// gashapon.next()...
gashapon.resetFromJSON(status);
```

### Get items

#### For each item

```javascript
gashapon.eachItem(function(name, count){
    console.log(name + ": " + count);
});
```

#### Get items

```javascript
var items = gashapon.getItems();
```
