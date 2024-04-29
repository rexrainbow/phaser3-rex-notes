# Text-box commands

## Create Game Object Instance

```

TEXTBOX
  id=NAME
  width=0
  height=0
  frameDelimiter=-
  vpx=0.5
  vpy=1
  vpw=
  vph=

```

Create TextBox as Text-box game object

- Default origin is `(0.5, 1)`

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
  text=
  typingSpeed=
  iconCrossDuration=
  iconCrossMode='crossFade'
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

Wait an extra clicking after typing complete internally.