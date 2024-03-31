# Background commands

## Create Game Object Instance

```
BG
  id=NAME
  param0=value
  param1=value
```

Create TransitionImagePack as Background game object.

## Destroy game object

```
NAME.destroy
```

## Game Object properties

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

## Game object methods

### Transition image

```
NAME.cross
  key=
  frame=
  duration=
  mode=fade
  wait=true
```

- `mode` : Pre-build effects
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

