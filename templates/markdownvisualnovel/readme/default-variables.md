# Default variables

## List of default variables

- `$typingSpeed` : For `TEXTBOX.typing` command
- `$transitionDuration` : For `SPRITE.cross`, `BG.cross` commands
- `$tintOthers` : For `SPRITE.focus` command
- `$clickTarget` : Click target to type next page, or finish typing
    - `screen` : Any click on screen to type next page, or finish typing
    - `textbox` : Click on textbox to type next page, or finish typing
    - `null` : Disable this feature
- `$clickShortcutKeys` : Press keyboard's key to type next page, or finish typing
    - Key string combined by `'|'`, e.x. `'SPACE|ENTER'`
    - `null` : Disable this feature
- `$shakeDuration`, `$shakeMagnitude` : Shake parameters for `SPRITE.shake`, `BG.shake`, `TEXTBOX.shake`, `TITLE.shake`, `CHOICE.shake` commands.

## Custom values

Assigned by `config.defaultVariables`

```javascript
var mdvn = new MarkdownVisualNovel(scene, {
    defaultVariables: {
        // ...
    }
})
```