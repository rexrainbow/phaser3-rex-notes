## Introduction

Round/ceil/floor to the given precision, built-in method of phaser.

- Author: Richard Davey

## Usage

### Round to

```javascript
var result = Phaser.Math.RoundTo(value);
```
or
```javascript
var result = Phaser.Math.RoundTo(value, place, base);
```

- `value` : The value to round.
- `place` : The place to round to. Positive to round the units, negative to round the decimal. Default is `0`.
- `base` : The base to round in. Default is `10` for decimal.

Examples

```javascript
RoundTo(123.456789, 0) = 123
RoundTo(123.456789, -1) = 123.5
RoundTo(123.456789, -2) = 123.46
RoundTo(123.456789, -3) = 123.457
```

### Ceil to

```javascript
var result = Phaser.Math.CeilTo(value);
```
or
```javascript
var result = Phaser.Math.CeilTo(value, place, base);
```

- `value` : The value to round.
- `place` : The place to round to. Positive to round the units, negative to round the decimal. Default is `0`.
- `base` : The base to round in. Default is `10` for decimal.

### Floor to

```javascript
var result = Phaser.Math.floorTo(value);
```
or
```javascript
var result = Phaser.Math.floorTo(value, place, base);
```

- `value` : The value to round.
- `place` : The place to round to. Positive to round the units, negative to round the decimal. Default is `0`.
- `base` : The base to round in. Default is `10` for decimal.


