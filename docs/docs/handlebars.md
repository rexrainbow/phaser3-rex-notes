## Introduction

Format string with variables, largely compatible with [Mustache](mustache.md) templates.
[Reference](https://github.com/handlebars-lang/handlebars.js)

## Usage

```javascript
var template = 'hello, {{name}}';
var view = {
    name: 'rex'
};
var result = Mustache.render(template, view);
```

### Pre-compile

```javascript
const template = Handlebars.compile("{{foo}}");
template({}, {
    // allowProtoPropertiesByDefault: false,
    // allowProtoMethodsByDefault: false
});
```