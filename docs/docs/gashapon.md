## Introduction

Gashapon in shuffle or random mode.

## Dependence

None

## Usage

### Create instance

```javascript
var gashapon = new Gashapon({
    mode: 'shuffle',  // 0|'shuffle'|1|'random
    items: {
        a:1, b:2, c:3  // itemName:count
    },
    reload: true,     // true|false
});
```

### Pick item

#### Pick a random item

```javascript
gashapon.next();  // return null if pick nothing
```

#### Try pick specific item

```javascript
gashapon.next('a');  // return null if pick nothing
```

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

### Remove item

#### Remove item

```javascript
gashapon.removeItem('a');
// gashapon.removeItem('b').gashapon.removeItem('c');
```

### Remove all items

```javascript
gashapon.removeAllItems();
```

### Get current status in JSON object

```javascript
var status = gashapon.toJSON();
// var gashapon2 = new Gashapon(status); // create new Gashapon object using previous status
```
