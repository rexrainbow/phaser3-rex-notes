## Introduction

Built-in javascript object.

- Author: Built-in javascript function

## Usage

### Run function for each element

```javascript
arr.forEach(function(element, index, arr) {
    //
}, scope);
```

### Filter elements

Creates a new array with all elements that pass the test function.

```javascript
var result = arr.filter(function(element, index, arr) {
    return true; // false
}, scope);
```

### Find one element

```javascript
var element = arr.find(function(element, index, arr) {
    return true; // false
}, scope);
```

### Map elements to a new array

```javascript
var newArray = arr.map(function(element, index, arr) {
    return newElement;
}, scope);
```