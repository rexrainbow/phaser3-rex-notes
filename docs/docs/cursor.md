## Introduction

Custom cursor, built-in feature of phaser.

- Author: Richard Davey

## Usage

References:

- [Cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
- [Using URL values for the cursor property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_User_Interface/Using_URL_values_for_the_cursor_property)

### Set default cursor

```javascript
scene.input.setDefaultCursor(CSSString);
// CSSString: 'url(assets/input/cursors/sword.cur), pointer'
```

### Set cursor of a Game Object

Change cursor image when cursor is over that Game Object.

```javascript
gameObject.setInteractive({
    cursor: CSSString
});
// CSSString: 'url(assets/input/cursors/sword.cur), pointer'
```

Set cursor image directly after `gameObject.setInteractive()`.

```javascript
gameObject.input.cursor = CSSString;
// CSSString: 'url(assets/input/cursors/sword.cur), pointer'
```

Use pointer (hand cursor).

```javascript
gameObject.setInteractive({
    useHandCursor: true
});
```

### Change current cursor

```javascript
scene.input.canvas.style.cursor = cursor;
```

- `cursor` : CSSString

or

```javascript
scene.input.setCursor(gameObject.input);
```

### Reset to default cursor

```javascript
scene.input.resetCursor(null, true);
```