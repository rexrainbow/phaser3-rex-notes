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
gameobject.setInteractive({
    cursor: CSSString
});
// CSSString: 'url(assets/input/cursors/sword.cur), pointer'
```

Set cursor image directly after `gameobject.setInteractive()`.

```javascript
gameobject.input.cursor = CSSString;
// CSSString: 'url(assets/input/cursors/sword.cur), pointer'
```

Use pointer (hand cursor).

```javascript
gameobject.setInteractive({
    useHandCursor: true
});
```