## Introduction

Snap a value to nearest grid slice, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Round

```javascript
var out = Phaser.Math.Snap.To(value, gap);
// var out = Phaser.Math.Snap.To(value, gap, start);
```

Example: set `gap` to `5`

- Set `value` to `12`, return `10`
- Set `value` to `14`, return `15`

### Ceil

```javascript
var out = Phaser.Math.Snap.Ceil(value, gap);
// var out = Phaser.Math.Snap.Ceil(value, gap, start);
```

Example: set `gap` to `5`

- Set `value` to `12`, return `15`
- Set `value` to `14`, return `15`

### Floor

```javascript
var out = Phaser.Math.Snap.Floor(value, gap);
// var out = Phaser.Math.Snap.Floor(value, gap, start);
```

Example: set `gap` to `5`

- Set `value` to `12`, return `10`
- Set `value` to `14`, return `10`