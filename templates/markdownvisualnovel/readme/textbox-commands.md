# Text-box commands

## Create Game Object Instance

```

TEXTBOX
  id=NAME
  width=0
  height=0  
  vpx=0.5
  vpy=1
  vpw=
  vph=
  frameDelimiter=-
  clickTarget=
  clickShortcutKeys=

```

Create TextBox as Text-box game object

- Default origin is `(0.5, 1)`
- `clickTarget` : Click target to type next page, or finish typing
    - `screen` : Any click on screen to type next page, or finish typing
    - `textbox` : Click on textbox to type next page, or finish typing
    - `null` : Disable this feature
- `clickShortcutKeys` : Press keyboard's key to type next page, or finish typing
    - Key string combined by `'|'`, e.x. `'SPACE|ENTER'`
    - `null` : Disable this feature

## Destroy

```

NAME.destroy

```

## Set properties

```

NAME.set
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=

```

## Ease properties

```

NAME.to
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=
```

or

```

NAME.yoyo
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=

```

## Call methods

### Typing

```

NAME.typing
  displayName=
  icon=
  iconFrame=
  name=
  expression=
  more=false
  text=
  typingSpeed=
  iconCrossDuration=
  iconCrossMode='crossFade'
  clickAfterComplete=true
  wait=true

```

or

~~~

```NAME.typing, name=, expression=, icon=, iconFrame=, typingSpeed=, iconCrossDuration=, iconCrossMode='crossFade', wait=true
text-line0
text-line1
text-line2
```

~~~

- `displayName` : Display `displayName` at title element.
    - `null` : Hide title element.
    - `undefined` : Don't change title element.
- `icon`, `iconFrame` : Texture key and frame name of icon element.
  - `undefined` : Using previous texture.
  - Set `icon` to `null` : Hide icon element.
- `expression` : Generate `iconFrame` by `${name}-${expression}`.
- `iconCrossMode` : Pre-build effects
    - Fade effects : 
        - `'fade'` : Tint old image to black, then tint new image from black to origin color.
        - `'crossFade'` : Ease alpha of old image from 1 to 0, and ease alpha of new image from 0 to 1 at the same time.
    - Slide effects : `'slideLeft'`, `'slideRight'`, `'slideUp'`, `'slideDown'`, 
      `'slideAwayLeft'`, `'slideAwayRight'`, `'slideAwayUp'`, `'slideAwayDown'`, 
      `'pushLeft'`, `'pushRight'`, `'pushUp'`, `'pushDown'`.
    - Zoom(scale) effects : `'zoomOut'`, `'zoomIn'`, `'zoomInOut'`.
    - Mask effects : `'wipeLeft'`, `'wipeRight'`, `'wipeUp'`, `'wipeDown'`,
      `'irisOut'`, `'irisIn'`,  `'irisInOut'`, `'pieOut'`, `'pieIn'`, `'pieInOut'`, 
      `'blinds'`, `'squares'`, `'diamonds'`, `'circles'`, `'curtain'`.
    - Shader effects : `'pixellate'`, `'dissolve'`, 
      `'revealLeft'`, `'revealRight'`, `'revealUp'`, `'revealDown'`
- `more` :
  - `false` : Clear and start a new typing task. Default behavior.
  - `true` : Append text and continue typing.
- `clickAfterComplete` : 
  - `false` : if `wait` is `true`, wait until typing complete
  - `true` : Wait until typing complete, then one more clicking. Default behavior.
- `wait` :
  - `false` : If `clickAfterComplete` is `false`, running next command immediately.
  - `true` : If `clickAfterComplete` is `false`, wait until typing complete. Default value is `true`.

Wait an extra clicking after typing complete internally.

### Shake

```

NAME.shake
  duration=
  magnitude=
  wait=true

```
