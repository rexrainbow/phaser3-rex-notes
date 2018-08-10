## Introduction

Format string with variables, built-in method of phaser.

- Author: Richard Davey

## Usage

Replace `%x` from an array. `x` starts from `1`.

```javascript
// const Format = Phaser.Utils.String.Format;
var template = 'hello, %1';
var view = ['rex'];
var result = Format(template, view);
```