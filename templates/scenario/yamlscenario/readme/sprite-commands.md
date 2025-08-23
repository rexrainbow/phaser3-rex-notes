# Sprite commands

## Create Game Object Instance

- Multiple altas
    ```yaml
    - name: SPRITE
      parameters:
        id: NAME
        name: 
        expression: 
        vpx: 0.5
        vpy: 1
        scale: 1
        scaleX: 
        scaleY: 
    ```
    - `name`, `expression` : Set texture key to `name`, and frame name to `expression`.
- Single altas
    ```yaml
    - name: SPRITE
      parameters:
        id: NAME
        key: 
        name: 
        expression: 
        frameDelimiter: "-"
        vpx: 0.5
        vpy: 1    
    ```
    - `key` : Set texture key to `key`.
    - `name`, `expression` : Set frame name as `name + frameDelimiter + expression`.

Create TransitionImagePack as Sprite game object.

- Default origin is `(0.5, 1)`

## Destroy

```yaml
- name: NAME.destroy
```

```yaml
- name: SPRITE.destroy
```

```yaml
- name: "!NAME.destroy"
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

```yaml
- name: SPRITE.set
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

```yaml
- name: "!NAME.set"
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

```yaml
- name: SPRITE.to
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

```yaml
- name: "!NAME.to:"
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

```yaml
- name: SPRITE.yoyo
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

```yaml
- name: "!NAME.yoyo:"
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
    name: 
    expression: 
    duration: 
    mode: fade
    wait: true
```
```yaml
- name: SPRITE.cross
  parameters:
    name: 
    expression: 
    duration: 
    mode: fade
    wait: true
```
```yaml
- name: "!NAME.cross"
  parameters:
    name: 
    expression: 
    duration: 
    mode: fade
    wait: true
```

- `name`, `expression` : Using previous `name`, or `expression` if `name`, or `expression` are not given (`undefined`).
    - Multiple altas mode : Set texture key to `name`, and frame name to `expression`.
    - Single altas mode : Keep current texture key, set frame name to `name + frameDelimiter + expression`.
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

### Focus

Bring me to top and set tint to 0x0 to other sprites

```yaml
- name: NAME.focus
  parameters:
    tintOthers: 
```

### Unfocus

Set tint to 0xffffff to all sprites

```yaml
- name: NAME.unfocus
```

### Say

SPRITE.cross + SPRITE.focus + TEXTBOX.typing

```yaml
- name: NAME.say
    parameters:
    name: 
    expression: 
    duration: 
    mode: fade
    tintOthers: 
    displayName: 
    icon: 
    iconFrame: 
    text: 
    more: false
    typingSpeed: 
    iconCrossDuration: 
    iconCrossMode: 'crossFade'
    waitIconAnimationMode:
    clickAfterComplete: true
    wait: true
```


Wait an extra clicking after typing complete internally.

- `clickAfterComplete` : 
  - `false` : if `wait` is `true`, wait until typing complete
  - `true` : Wait until typing complete, then one more clicking. Default behavior.
- `wait` :
  - `false` : If `clickAfterComplete` is `false`, running next command immediately.
  - `true` : If `clickAfterComplete` is `false`, wait until typing complete.

### Shake

```yaml
- name: NAME.shake
  parameters:
    duration: 
    magnitude: 
    wait: true
```
