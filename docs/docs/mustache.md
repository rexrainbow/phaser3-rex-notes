## Introduction

Format string with variables.  
[Reference](https://github.com/janl/mustache.js)

## Usage

```javascript
var template = 'hello, {{name}}';
var view = {
    name: 'rex'
};
var result = Mustache.render(template, view);
```