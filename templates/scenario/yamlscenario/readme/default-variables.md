# Default variables

## List of default variables

- `$typingSpeed` : For `TEXTBOX.typing` command
- `$autoNextPage`, `$autoNextPageDelay` : When typing page-end and `$autoNextPage` set to `true`, it will emit `click` event after a small delay (`$autoNextPageDelay`)
- `$fastTyping`, `$fastTypingSpeed` : When `$fastTyping` set to `true`, it will typing with speed `$fastTypingSpeed`, and emit `click` event when typing page-end
    - `$fastTyping` has higher priority then `$autoNextPage`
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