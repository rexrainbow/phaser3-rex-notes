## Introduction

Some helper methods for [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), [Bitmap text object](bitmaptext.md) game objects

- Author: Rex
- Methods

## Live demos

- [Wrap-expand-text](https://codepen.io/rexrainbow/pen/xxMdVOZ)
- [Wrap-expand-bitmaptext](https://codepen.io/rexrainbow/pen/QWYvNEJ)
- [Fontsize-expand-text](https://codepen.io/rexrainbow/pen/WNMmEEj)
- [Resize Fontsize-expand-text](https://codepen.io/rexrainbow/pen/BaGLbKr)

## Usage
- [Wrap-expand-text](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-wrap-expand-text)
- [Fontsize-expand-text](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-fontsize-expand-text)

### Wrap expand text

```javascript
sizer
    .add(
        this.rexUI.wrapExpandText(this.add.text(0, 0, content)),
        {
            // proportion: 1,
            // expand: true
        }
    )
```

- `proportion: 1` or/and `expand: true` : Expand width of text

### Fontsize expand text

```javascript
sizer
    .add(
        this.rexUI.fontSizeExpandText(this.add.text(0, 0, content)),
        {
            // proportion: 1,
            // expand: true
        }
    )
```

- `proportion: 1` or/and `expand: true` : Expand width of text