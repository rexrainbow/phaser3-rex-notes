## Introduction

Built-in javascript object.

- Author: Built-in javascript function

## Usage

### Run function for each element

```javascript
var callback = function(element, index, arr) {};
arr.forEach(callback);
// arr.forEach(callback, scope);
```

### Filter elements

Creates a new array with all elements that pass the test function.

```javascript
var callback = function(element, index, arr) {
    // return true; // false
};
var result = arr.filter(callback);
// var result = arr.filter(callback, scope);
```