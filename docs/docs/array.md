## Introduction

Built-in javascript object.

- Author: Built-in javascript function

## Usage

### Filter elements

Creates a new array with all elements that pass the test function. [Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```javascript
// var elems = [...]
var result = elems.filter(function(el){
    return (el.x > 400);
});
```