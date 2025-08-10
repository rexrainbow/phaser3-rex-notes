# Background commands

## Create Game Object Instance

```yaml
- name: BG
  parameters:
    id: NAME
    key: value
    frame: value
    vpx: 0.5
    vpy: 0.5
    vpw: 
    vph: 
    scaleMode: 
```

Create TransitionImagePack as Background game object.

- `scaleMode` : `FIT` or `ENVELOP`

## Destroy

```yaml
- name: NAME.destroy
```

## Set properties

```yaml
- name: NAME.set
  parameters:
    x: 
    vpx: 
    y: 
    vpy: 
    alpha: 
    duration: 1000
    ease: Linear
    repeat: 0
    wait: 
```

## Ease properties

```yaml
- name: NAME.to
  parameters:
    x: 
    vpx: 
    y: 
    vpy: 
    alpha: 
    duration: 1000
    ease: Linear
    repeat: 0
    wait: 
```

or

```yaml
- name: NAME.yoyo
  parameters:
    x: 
    vpx: 
    y: 
    vpy: 
    alpha: 
    duration: 1000
    ease: Linear
    repeat: 0
    wait: 
```

## Call methods

### Transition image

```yaml
- name: NAME.cross
  parameters:
    key: 
    frame: 
    duration: 
    mode: fade
    wait: true
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

### Shake

```yaml
- name: NAME.shake
  parameters:
    duration: 
    magnitude: 
    wait: true
```
